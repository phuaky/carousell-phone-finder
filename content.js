// Carousell Phone Finder - Content Script
console.log('Carousell Phone Finder loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scrapeListings') {
          handleScrape(request.filters, request.weights)
            .then(sendResponse)
            .catch(err => sendResponse({ error: err.message }));
          return true;
    }
});

async function handleScrape(filters, weights) {
    const listings = await scrapeCurrentPage();
    const scored = scoreListings(listings, weights, filters);
    return { listings: scored };
}

async function scrapeCurrentPage() {
    const listings = [];
    const cards = document.querySelectorAll('a[href*="/p/"]');

  for (const card of cards) {
        try {
                const listing = extractListingFromCard(card);
                if (listing && listing.title && listing.price) {
                          listings.push(listing);
                }
        } catch (e) {
                console.warn('Failed to parse listing:', e);
        }
  }

  return [...new Map(listings.map(l => [l.url, l])).values()];
}

function extractListingFromCard(card) {
    const url = card.href;
    const text = card.textContent || '';
    const parentText = card.closest('div')?.textContent || text;

  const titleMatch = text.match(/iPhone\s*15[^S$]*/i);
    const priceMatch = text.match(/S\$\s*([\d,]+)/);
    const batteryMatch = parentText.match(/(\d{2,3})%/);
    const storageMatch = text.match(/(\d{3,4})\s*GB/i);

  let condition = 'Unknown';
    if (/brand\s*new/i.test(text)) condition = 'Brand new';
    else if (/like\s*new/i.test(text)) condition = 'Like new';
    else if (/lightly\s*used/i.test(text)) condition = 'Lightly used';
    else if (/heavily\s*used/i.test(text)) condition = 'Heavily used';

  let model = 'iPhone 15';
    if (/pro\s*max/i.test(text)) model = 'iPhone 15 Pro Max';
    else if (/pro/i.test(text)) model = 'iPhone 15 Pro';
    else if (/plus/i.test(text)) model = 'iPhone 15 Plus';

  return {
        id: url.match(/-(\d+)\/?(\?|$)/)?.[1],
        url,
        title: titleMatch?.[0]?.trim() || model,
        price: priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : null,
        condition,
        batteryHealth: batteryMatch ? parseInt(batteryMatch[1]) : null,
        storage: storageMatch ? parseInt(storageMatch[1]) : null,
        model
  };
}

function scoreListings(listings, weights, filters) {
    const scorer = new PhoneScorer(weights);
    return listings
      .map(l => ({ ...l, score: scorer.score(l) }))
      .filter(l => {
              if (filters.maxPrice && l.price > filters.maxPrice) return false;
              if (filters.minBattery && l.batteryHealth && l.batteryHealth < filters.minBattery) return false;
              return true;
      });
}

class PhoneScorer {
    constructor(weights = {}) {
          this.weights = {
                  age: weights.age || 0.35,
                  battery: weights.battery || 0.30,
                  condition: weights.condition || 0.20,
                  price: weights.price || 0.15
          };
          this.conditionScores = {
                  'Brand new': 100, 'Like new': 90, 'Lightly used': 75,
                  'Well used': 50, 'Heavily used': 30, 'Unknown': 50
          };
          this.avgPrices = {
                  'iPhone 15': 600, 'iPhone 15 Plus': 700,
                  'iPhone 15 Pro': 800, 'iPhone 15 Pro Max': 1000
          };
    }

  score(listing) {
        const batteryScore = listing.batteryHealth ? 
                Math.max(0, Math.min(100, (listing.batteryHealth - 80) * 5)) : 50;
        const conditionScore = this.conditionScores[listing.condition] || 50;
        const priceScore = listing.price ? 
                Math.min(100, (this.avgPrices[listing.model] || 700) / listing.price * 70) : 50;

      const total = (50 * this.weights.age) + (batteryScore * this.weights.battery) +
                          (conditionScore * this.weights.condition) + (priceScore * this.weights.price);

      return { total: Math.round(total * 100) / 100, breakdown: { battery: batteryScore, condition: conditionScore, price: priceScore } };
  }
}
