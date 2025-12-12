// Carousell Phone Finder - Popup Script
document.getElementById('scanBtn').addEventListener('click', async () => {
    const status = document.getElementById('status');
    const results = document.getElementById('results');
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || 9999;
    const minBattery = parseInt(document.getElementById('minBattery').value) || 0;

                                                      status.textContent = '🔍 Scanning...';
    results.innerHTML = '';

                                                      try {
                                                            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                                                            if (!tab.url.includes('carousell.sg')) {
                                                                    status.textContent = '❌ Please navigate to Carousell Singapore first!';
                                                                    return;
                                                            }

      const response = await chrome.tabs.sendMessage(tab.id, {
              action: 'scrapeListings',
              filters: { maxPrice, minBattery },
              weights: { age: 0.35, battery: 0.30, condition: 0.20, price: 0.15 }
      });

      if (response?.listings?.length) {
              displayResults(response.listings);
              status.textContent = '✅ Found ' + response.listings.length + ' listings';
      } else {
              status.textContent = '❌ No listings found. Try scrolling down first.';
      }
                                                      } catch (error) {
                                                            status.textContent = '❌ Error: ' + error.message;
                                                      }
});

function displayResults(listings) {
    const container = document.getElementById('results');
    listings.sort((a, b) => (b.score?.total || 0) - (a.score?.total || 0));

  container.innerHTML = listings.map((l, i) => {
        const isTop = i === 0;
        return '<div class="listing" style="border-left-color:' + (isTop ? '#FFD700' : '#4CAF50') + '">' +
                '<div class="score" style="color:' + (isTop ? '#FFD700' : '#4CAF50') + '">' + (isTop ? '🏆 ' : '') + (l.score?.total?.toFixed(1) || '?') + '/100</div>' +
                '<div class="listing-title">' + (l.title || 'Unknown') + '</div>' +
                '<div><span class="tag price">S$' + (l.price || '?') + '</span>' +
                '<span class="tag battery">🔋 ' + (l.batteryHealth || '?') + '%</span>' +
                '<span class="tag">' + (l.condition || '?') + '</span></div>' +
                '<a href="' + l.url + '" target="_blank">View Listing →</a></div>';
  }).join('');
}
