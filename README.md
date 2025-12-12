# 📱 Carousell Phone Finder

A Chrome extension to find the best value iPhone deals on Carousell Singapore with smart scoring algorithm for battery health, age, condition and price.

## 🎯 Features

- **Smart Value Scoring**: Automatically calculates value scores based on multiple factors
- - **Battery Health Detection**: Extracts and displays battery percentage from listings
  - - **Age Analysis**: Prioritizes newer phones based on manufacture date
    - - **Price Comparison**: Identifies below-average prices for better deals
      - - **Visual Overlays**: Shows value badges directly on listing cards
       
        - ## 🧮 Scoring Algorithm
       
        - The extension uses a weighted algorithm optimized for finding the best value:
       
        - | Factor | Weight | Description |
        - |--------|--------|-------------|
        - | **Age of Device** | 35% | Newer manufacture date = higher score |
        - | **Battery Health** | 30% | Higher battery % = better score, original battery preferred |
        - | **Condition** | 20% | Like new > Well used > Heavily used |
        - | **Price** | 15% | Below average price gets bonus points |
        - | **Storage** | 0% | Deprioritized (not a factor) |
       
        - ### Score Breakdown
       
        - - **90-100**: 🟢 Excellent - Best value, buy immediately
          - - **75-89**: 🔵 Good - Great deal, worth considering
            - - **60-74**: 🟡 Fair - Average value
              - - **Below 60**: 🔴 Poor - Overpriced or issues
               
                - ## 🚀 Installation
               
                - 1. **Download the extension**:
                  2.    ```bash
                           git clone https://github.com/phuaky/carousell-phone-finder.git
                           ```

                        2. **Open Chrome Extensions**:
                        3.    - Navigate to `chrome://extensions/`
                              -    - Enable "Developer mode" (toggle in top right)
                               
                                   - 3. **Load the extension**:
                                     4.    - Click "Load unpacked"
                                           -    - Select the `carousell-phone-finder` folder
                                            
                                                - 4. **Start using**:
                                                  5.    - Go to [Carousell Singapore](https://www.carousell.sg)
                                                        -    - Search for "iPhone 15" or your preferred model
                                                             -    - Click the extension icon to scan listings
                                                              
                                                                  - ## 📁 File Structure
                                                              
                                                                  - ```
                                                                    carousell-phone-finder/
                                                                    ├── manifest.json      # Extension configuration
                                                                    ├── content.js         # Main scraping and scoring logic
                                                                    ├── content.css        # Visual styling for overlays
                                                                    ├── popup.html         # Extension popup UI
                                                                    ├── popup.js           # Popup interaction logic
                                                                    ├── README.md          # This file
                                                                    └── LICENSE            # MIT License
                                                                    ```

                                                                    ## 💡 How It Works

                                                                    1. **Navigate** to Carousell iPhone listings
                                                                    2. 2. **Click** the extension icon
                                                                       3. 3. **Scan** analyzes all visible listings
                                                                          4. 4. **Score badges** appear on each listing card
                                                                             5. 5. **Click** any badge to see detailed breakdown
                                                                               
                                                                                6. ### Data Extracted
                                                                               
                                                                                7. - Listing ID
                                                                                   - - Model (iPhone 15, 15 Pro, 15 Pro Max)
                                                                                     - - Storage (128GB, 256GB, 512GB, 1TB)
                                                                                       - - Price
                                                                                         - - Battery Health %
                                                                                           - - Battery Type (Original/Replaced)
                                                                                             - - Manufacture Date
                                                                                               - - Cycle Count
                                                                                                 - - Condition
                                                                                                  
                                                                                                   - ## 🎯 Recommended Strategy
                                                                                                  
                                                                                                   - Based on our analysis of 36+ listings:
                                                                                                  
                                                                                                   - ### Budget S$500
                                                                                                   - - Target: iPhone 15 128GB
                                                                                                     - - Look for: 90%+ battery, 2024 manufacture
                                                                                                       - - Negotiate: Offer S$450-470
                                                                                                        
                                                                                                         - ### Budget S$600
                                                                                                         - - Target: iPhone 15 Pro 256GB
                                                                                                           - - Look for: 85%+ battery, good condition
                                                                                                             - - Negotiate: Offer S$550-570
                                                                                                              
                                                                                                               - ### Budget S$650+
                                                                                                               - - Target: iPhone 15 128GB "Like New"
                                                                                                                 - - Look for: 100% battery, minimal usage
                                                                                                                   - - These often have warranty remaining
                                                                                                                    
                                                                                                                     - ## ⚠️ Tips
                                                                                                                    
                                                                                                                     - - Always verify battery health claims in person
                                                                                                                       - - Check for original Apple battery (non-original = penalty)
                                                                                                                         - - Newer manufacture date often means less usage
                                                                                                                           - - "Like new" condition should have 95%+ battery
                                                                                                                             - - Negotiate 5-10% below listed price
                                                                                                                              
                                                                                                                               - ## 🛠️ Development
                                                                                                                              
                                                                                                                               - ### Prerequisites
                                                                                                                               - - Chrome browser
                                                                                                                                 - - Basic knowledge of JavaScript
                                                                                                                                  
                                                                                                                                   - ### Local Development
                                                                                                                                   - 1. Make changes to source files
                                                                                                                                     2. 2. Go to `chrome://extensions/`
                                                                                                                                        3. 3. Click the refresh icon on the extension card
                                                                                                                                          
                                                                                                                                           4. ## 📝 License
                                                                                                                                          
                                                                                                                                           5. MIT License - feel free to modify and use!
                                                                                                                                          
                                                                                                                                           6. ## 🙏 Credits
                                                                                                                                          
                                                                                                                                           7. Built with Claude AI assistance for Carousell Singapore iPhone shopping.
                                                                                                                                          
                                                                                                                                           8. ---
                                                                                                                                          
                                                                                                                                           9. **Disclaimer**: This extension is for personal use. Please respect Carousell's terms of service.
