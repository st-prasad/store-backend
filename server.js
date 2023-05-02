// sk_test_51MvygxGdMF0I3225lvwVvgk5avpDSrIYo6JHmGVnAtKbw2sc0dRfcnnavhrXYyKwaSxbQNUOzdOwLRsJyogFRwsr00P1RbSiIx

// coffee-  price_1Mw3KUGdMF0I3225bVRKNuGZ
// bread- price_1Mw3OxGdMF0I3225hfbSYSbV
// cake- price_1Mw3QHGdMF0I3225pJ8jMsbY

const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51MvygxGdMF0I3225lvwVvgk5avpDSrIYo6JHmGVnAtKbw2sc0dRfcnnavhrXYyKwaSxbQNUOzdOwLRsJyogFRwsr00P1RbSiIx');
const path = require('path');
const app = express();

// Serve static files from the React app
const buildPath = path.join(__dirname, 'webstore', 'dist');
app.use(express.static(buildPath));

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/checkout', async (req, res) => {

     /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]
    */

    console.log(req.body.items);
    const items = req.body.items;
    let lineItems = [];
    items.forEach(item => {
        lineItems.push({
            price: item.id,
            quantity: item.quantity
        });
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems, // corrected the variable name
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel'
    });

    res.send(JSON.stringify({
        url: session.url
    }));

});

// app.listen(4000, () => {
//     console.log('Server started on port 4000');
// });

// Handle client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
  
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));