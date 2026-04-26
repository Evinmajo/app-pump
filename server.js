// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- IMPORTANT: Define specific HTML serving routes BEFORE static file middleware ---

// Routes for serving HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
app.get('/staff', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/hbvheiwbvhebnjhfrbvhjdbhvbfxjkbkdbhadmin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view.html'));
});
app.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'edit.html'));
});
// New routes for login and register pages
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/uygrbyeyeggbey5ebgy7fgvifview_transactions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view_transactions.html'));
});
// NEW: Route for the price change page
app.get('/hiyth4ygb5yhgtiuriueiuhgtuhg8price', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'price.html'));
});
// NEW: Route for the Reading Difference page
app.get('/reading-diff', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diff.html'));
});
// NEW: Route for the oil stock management page
app.get('/oil_stock', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'oil_stock.html'));
});
app.get('/packed-oil-history', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'packed_oil_history.html'));
});
app.get('/excess-shot-report', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'excess_shot.html'));
});
// Route for the Staff Denomination Report page
app.get('/staff-denominations', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'staff_denominations.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
app.get('/master_dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'master_view.html'));
});
app.get('/creditor-summary', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'creditor_summary.html'));
});
app.get('/manage-parties', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'parties.html'));
});
app.get('/tank-stock', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tank_stock.html'));
});
// Serve static files from the 'public' directory
// This middleware will now only handle requests that haven't been caught by the routes above
app.use(express.static(path.join(__dirname, 'public')));


// Enable CORS for all routes (important if frontend and backend are on different origins during development)
// In production, you might want to configure CORS more restrictively.
app.use(cors());


// MongoDB Connection
// Replace with your actual MongoDB connection string
//mongodb+srv://wyenfos013:wyenfos4551@cluster0.90i2ivc.mongodb.net/adminp
//mongodb+srv://amballurpetropark:OqHE64SKhbmqENG4@cluster0.gcb7yyp.mongodb.net/
mongoose.connect(`mongodb+srv://amballurpetropark:OqHE64SKhbmqENG4@cluster0.gcb7yyp.mongodb.net/`)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error(err));

// --- Mongoose Schemas and Models ---

// Schema for User Authentication
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.model('User', userSchema);

// NEW: Schema for Staff (separate from User for login)
const staffSchema = new mongoose.Schema({
    // MongoDB will automatically generate an _id
    staffId: { // New field to store the user-provided staff ID
        type: String,
        required: true,
        unique: true, // Ensure staff IDs are unique
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Staff = mongoose.model('Staff', staffSchema);


// Schema for Reading Data
const readingSchema = new mongoose.Schema({
    currentDate: { type: String, required: true },
    selectedId: { type: String, required: true }, // This will now store the staffId
    shift: { type: String, required: true },
    petrol: { type: Number, default: 0 },
    diesel: { type: Number, default: 0 },
    oil: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
    oilFirstReading: { type: Number, default: 0 },
    oilSecondReading: { type: Number, default: 0 },
    speedFirstReading1: { type: Number, default: 0 },
    speedFirstReading2: { type: Number, default: 0 },
    speedFirstReading3: { type: Number, default: 0 },
    speedSecondReading1: { type: Number, default: 0 },
    speedSecondReading2: { type: Number, default: 0 },
    speedSecondReading3: { type: Number, default: 0 },
    firstReading1: { type: Number, default: 0 },
    firstReading2: { type: Number, default: 0 },
    firstReading3: { type: Number, default: 0 },
    firstReading4: { type: Number, default: 0 }, // New
    firstReading5: { type: Number, default: 0 }, // New
    firstReading6: { type: Number, default: 0 }, // New
    secondReading1: { type: Number, default: 0 },
    secondReading2: { type: Number, default: 0 },
    secondReading3: { type: Number, default: 0 },
    secondReading4: { type: Number, default: 0 }, // New
    secondReading5: { type: Number, default: 0 }, // New
    secondReading6: { type: Number, default: 0 }, // New
    dieselFirstReading1: { type: Number, default: 0 },
    dieselFirstReading2: { type: Number, default: 0 },
    dieselFirstReading3: { type: Number, default: 0 },
    dieselFirstReading4: { type: Number, default: 0 }, // New
    dieselFirstReading5: { type: Number, default: 0 }, // New
    dieselFirstReading6: { type: Number, default: 0 }, // New
    dieselSecondReading1: { type: Number, default: 0 },
    dieselSecondReading2: { type: Number, default: 0 },
    dieselSecondReading3: { type: Number, default: 0 },
    dieselSecondReading4: { type: Number, default: 0 }, // New
    dieselSecondReading5: { type: Number, default: 0 }, // New
    dieselSecondReading6: { type: Number, default: 0 }, // New
    speedTestQuantity: { type: Number, default: 0 },
    petrolTestQuantity: { type: Number, default: 0 },
    dieselTestQuantity: { type: Number, default: 0 },
   packedOilEntries: [{ name: String, amount: Number, price: Number}],
    creditEntries: [{ name: String, amount: Number }],
    debitEntries: [{ name: String, amount: Number }],
    debitBankEntries: [{ name: String, amount: Number }],
    expenseEntries: [{ name: String, amount: Number }],
    expenseBankEntries: [{ name: String, amount: Number }],
    cashBankDeposit: { type: Number, default: 0 },
    note500: { type: Number, default: 0 },
    note200: { type: Number, default: 0 },
    note100: { type: Number, default: 0 },
    note50: { type: Number, default: 0 },
    note20: { type: Number, default: 0 },
    note10: { type: Number, default: 0 },
    note5: { type: Number, default: 0 },
    coins: { type: Number, default: 0 },
    totalDenomination: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now } // Add timestamp
});

const Reading = mongoose.model('Reading', readingSchema);

const tankStockSchema = new mongoose.Schema({
    fuelType: { type: String, required: true, unique: true }, // 'Petrol', 'Diesel', 'Speed'
    currentLiters: { type: Number, default: 0 }
});
const TankStock = mongoose.model('TankStock', tankStockSchema);

// Schema for Tank History (Loads & Automation Checks)
const tankHistorySchema = new mongoose.Schema({
    date: { type: String, required: true },
    fuelType: { type: String, required: true },
    type: { type: String, enum: ['Load', 'AutomationCheck', 'Adjustment', 'Sale'] },
    liters: { type: Number, required: true },
    // NEW: Snapshot fields for current stock levels
    pStock: { type: Number, default: 0 },
    dStock: { type: Number, default: 0 },
    sStock: { type: Number, default: 0 },
    physicalStockAtTime: { type: Number }, 
    loss: { type: Number, default: 0 }, 
    timestamp: { type: Date, default: Date.now }
});
const TankHistory = mongoose.model('TankHistory', tankHistorySchema);

// NEW: Schema for Expense Names
const expenseNameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ExpenseName = mongoose.model('ExpenseName', expenseNameSchema);

// NEW: Schema for Oil Stock (Inventory master list)
const oilStockSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const OilStock = mongoose.model('OilStock', oilStockSchema);

// const defaultReadingSchema = new mongoose.Schema({
//     // Store Petrol readings
//     p1: { type: Number, default: 0 },
//     p2: { type: Number, default: 0 },
//     p3: { type: Number, default: 0 },
//     p4: { type: Number, default: 0 }, // New
//     p5: { type: Number, default: 0 }, // New
//     p6: { type: Number, default: 0 }, // New
    
//     // Store Diesel readings
//     d1: { type: Number, default: 0 },
//     d2: { type: Number, default: 0 },
//     d3: { type: Number, default: 0 },
//     d4: { type: Number, default: 0 }, // New
//     d5: { type: Number, default: 0 }, // New
//     d6: { type: Number, default: 0 },  // New
//     s1: { type: Number, default: 0 },
//     s2: { type: Number, default: 0 },
//     s3: { type: Number, default: 0 }
// });

// const DefaultReading = mongoose.model('DefaultReading', defaultReadingSchema);

// NEW: Schema for Party
const partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Party = mongoose.model('Party', partySchema);

// NEW: Schema for Prices
// This schema will store the current petrol, diesel, and oil prices.
// We'll design it to hold only one document.
const priceSchema = new mongoose.Schema({
    petrolPrice: { type: Number, default: 0 },
    dieselPrice: { type: Number, default: 0 },
    oilPrice: { type: Number, default: 0 },
    speedPrice: { type: Number, default: 0 }
    // A flag to ensure only one document exists, or just rely on finding/upserting the first one
    // lastUpdated: { type: Date, default: Date.now } // Could add a timestamp if needed
});

// Create a static method to get or create the single price document
priceSchema.statics.getPrices = async function() {
    let prices = await this.findOne();
    if (!prices) {
        prices = await this.create({ petrolPrice: 0, dieselPrice: 0, oilPrice: 0, speedPrice: 0 }); // Initialize with zeros
    }
    return prices;
};

const Price = mongoose.model('Price', priceSchema);

// --- API Endpoints for Expense Names ---

app.get('/api/parties', async (req, res) => {
    try {
        const parties = await Party.find().sort({ name: 1 });
        res.json(parties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/parties', async (req, res) => {
    try {
        const newParty = new Party(req.body);
        await newParty.save();
        res.status(201).json(newParty);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/parties/:id', async (req, res) => {
    try {
        await Party.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Expense Routes ---
app.get('/api/expenses', async (req, res) => {
    try {
        const expenses = await ExpenseName.find().sort({ name: 1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/expenses', async (req, res) => {
    try {
        const newExpense = new ExpenseName(req.body);
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/expenses/:id', async (req, res) => {
    try {
        await ExpenseName.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// --- API Endpoints for User Authentication ---


// Login User
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Compare provided password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // In a real application, you would generate a JWT here and send it to the client
        // For this example, we'll just send a success message.
        res.status(200).json({ message: 'Logged in successfully!' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
});

// --- API Endpoint for User Registration ---
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create new user (the password will be hashed by the pre-save hook in your schema)
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
});

async function getStockSnapshot() {
    const stocks = await TankStock.find();
    const map = { Petrol: 0, Diesel: 0, Speed: 0 };
    stocks.forEach(s => { map[s.fuelType] = s.currentLiters; });
    return map;
}

// Get Current Stock
app.get('/api/tanks/stock', async (req, res) => {
    const stocks = await TankStock.find();
    res.json(stocks);
});

// Add Stock Loading
app.post('/api/tanks/load', async (req, res) => {
    const { fuelType, amount, date } = req.body;
    await TankStock.findOneAndUpdate(
        { fuelType },
        { $inc: { currentLiters: Number(amount) } },
        { upsert: true }
    );
    const stocks = await getStockSnapshot();
    const history = new TankHistory({ 
        date, fuelType, type: 'Load', liters: amount,
        pStock: stocks.Petrol, dStock: stocks.Diesel, sStock: stocks.Speed 
    });
    await history.save();
    res.status(201).json({ message: 'Stock added' });
});

// Record Automation Data & Calculate Loss
app.post('/api/tanks/check-loss', async (req, res) => {
    const { fuelType, automationLiters, date } = req.body;
    const stock = await TankStock.findOne({ fuelType });
    const currentDBStock = stock ? stock.currentLiters : 0;
    const loss = currentDBStock - Number(automationLiters);

    // Capture snapshot
    const stocks = await getStockSnapshot();
    const history = new TankHistory({
        date, fuelType, type: 'AutomationCheck', 
        liters: automationLiters,
        physicalStockAtTime: currentDBStock,
        loss: loss,
        // Ensure these are included here too
        pStock: stocks.Petrol, dStock: stocks.Diesel, sStock: stocks.Speed 
    });
    await history.save();
    res.json({ loss });
});

// Get History
app.get('/api/tanks/history', async (req, res) => {
    const history = await TankHistory.find().sort({ timestamp: -1 });
    res.json(history);
});
// Manual Stock Adjustment (Increase or Decrease)
app.post('/api/tanks/manual-adjust', async (req, res) => {
    try {
        const { fuelType, amount, type, date } = req.body;
        const adjustment = type === 'Increase' ? Number(amount) : -Number(amount);

        await TankStock.findOneAndUpdate(
            { fuelType },
            { $inc: { currentLiters: adjustment } },
            { upsert: true }
        );

        // Capture snapshot AFTER update
        const stocks = await getStockSnapshot();
        const history = new TankHistory({ 
            date, fuelType, type: 'Adjustment', liters: adjustment,
            pStock: stocks.Petrol, dStock: stocks.Diesel, sStock: stocks.Speed 
        });
        await history.save();
        
        res.status(200).json({ message: 'Stock adjusted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Adjustment failed', error: error.message });
    }
});
// Add this with your other Tank API endpoints in server.js
app.delete('/api/tanks/history/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecord = await TankHistory.findByIdAndDelete(id);

        if (!deletedRecord) {
            return res.status(404).json({ message: 'History record not found' });
        }

        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
        console.error('Error deleting tank history:', error);
        res.status(500).json({ message: 'Error deleting record', error: error.message });
    }
});
// --- NEW API Endpoints for Staff Management ---

// API Endpoint to add a new staff member
app.post('/api/staff', async (req, res) => {
    try {
        const { staffId, name } = req.body; // Destructure staffId and name
        const newStaff = new Staff({ staffId, name }); // Use staffId from req.body
        await newStaff.save();
        res.status(201).json(newStaff);
    } catch (error) {
        console.error('Error adding staff:', error);
        if (error.code === 11000) { // Duplicate key error
            return res.status(409).json({ message: 'A staff member with this ID already exists.', error: error.message });
        }
        res.status(500).json({ message: 'Error adding staff', error: error.message });
    }
});

// API Endpoint to get all staff members
app.get('/api/staff', async (req, res) => {
    try {
        const staffList = await Staff.find({});
        res.status(200).json(staffList);
    } catch (error) {
        console.error('Error fetching staff:', error);
        res.status(500).json({ message: 'Error fetching staff', error: error.message });
    }
});

// API Endpoint to delete a staff member by staffId (the custom ID)
app.delete('/api/staff/:staffId', async (req, res) => {
    try {
        const { staffId } = req.params;
        // Use findOneAndDelete to query by the custom staffId field
        const deletedStaff = await Staff.findOneAndDelete({ staffId: staffId });

        if (!deletedStaff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        res.status(200).json({ message: 'Staff member deleted successfully', deletedStaff });
    } catch (error) {
        console.error('Error deleting staff:', error);
        res.status(500).json({ message: 'Error deleting staff', error: error.message });
    }
});

app.get('/api/reports/staff-denominations', async (req, res) => {
    try {
        const { fromDate, toDate, staff } = req.query;
        let query = { currentDate: { $gte: fromDate, $lte: toDate } };

        if (staff && staff !== "") { query.selectedId = staff; }

        const readings = await Reading.find(query).sort({ currentDate: -1 });
        const staffList = await Staff.find({});
        
        const reportData = readings.map(reading => {
            const staffInfo = staffList.find(s => s.staffId === reading.selectedId);
            return {
                date: reading.currentDate,
                name: staffInfo ? staffInfo.name : `Unknown (${reading.selectedId})`,
                totalDenomination: Number(reading.totalDenomination || 0),
                cashBankDeposit: Number(reading.cashBankDeposit || 0) // ADD THIS LINE
            };
        });

        const grouped = reportData.reduce((acc, curr) => {
            if (!acc[curr.date]) acc[curr.date] = [];
            acc[curr.date].push(curr);
            return acc;
        }, {});

        res.status(200).json(grouped);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching report', error: error.message });
    }
});

app.get('/api/reports/creditor-summary', async (req, res) => {
    try {
        // 1. Include 'debitBankEntries' in the selection
        const readings = await Reading.find({}).select('creditEntries debitEntries debitBankEntries');
        const summary = {};

        readings.forEach(reading => {
            // Helper to initialize and process entries
            const process = (entries, type) => {
                if (entries && Array.isArray(entries)) {
                    entries.forEach(entry => {
                        const name = entry.name.trim();
                        if (!summary[name]) {
                            summary[name] = { credits: 0, debits: 0, bank: 0 };
                        }
                        
                        // Map specific types to the correct summary key
                        if (type === 'credit') summary[name].credits += Number(entry.amount || 0);
                        if (type === 'debit') summary[name].debits += Number(entry.amount || 0);
                        if (type === 'bank') summary[name].bank += Number(entry.amount || 0);
                    });
                }
            };

            process(reading.creditEntries, 'credit');
            process(reading.debitEntries, 'debit');
            process(reading.debitBankEntries, 'bank'); // Process the new array
        });

        // 2. Convert to array and apply the specific formula
        const report = Object.keys(summary).map(name => {
            const totalCr = summary[name].credits;
            const totalDr = summary[name].debits;
            const totalBank = summary[name].bank;
            
            return {
                name: name,
                totalCredits: totalCr.toFixed(2),
                totalDebits: totalDr.toFixed(2),
                totalDebitBank: totalBank.toFixed(2),
                // FORMULA: totalCredit - totalDebit - totaldebitbank
                pendingBalance: (totalCr - totalDr - totalBank).toFixed(2)
            };
        }).filter(item => item.name !== "");

        // Sort by highest pending balance
        report.sort((a, b) => b.pendingBalance - a.pendingBalance);

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error calculating summary', error: error.message });
    }
});

app.get('/api/reports/daily-excess-shot', async (req, res) => {
    try {
        const { date } = req.query;
        const readings = await Reading.find({ currentDate: date });
        console.log(readings);
        
        const staffList = await Staff.find({});

        const report = readings.map(reading => {
            const staff = staffList.find(s => s.staffId === reading.selectedId);
            const name = staff ? staff.name : reading.selectedId;

            console.log(`--- Calculating for Staff: ${name} ---`);

            // 1. OIL SALES: (First - Second) * Price
            const oilReq = ((Number(reading.oilFirstReading || 0) - Number(reading.oilSecondReading || 0))) * Number(reading.oil || 0);
            console.log(`Oil Money: ${oilReq}`);

            // 2. PETROL SALES: (Second - First) * Price
            const petrolReq = ((Number(reading.secondReading1 || 0) - Number(reading.firstReading1 || 0)) +
                               (Number(reading.secondReading2 || 0) - Number(reading.firstReading2 || 0)) +
                               (Number(reading.secondReading3 || 0) - Number(reading.firstReading3 || 0)) +
                               (Number(reading.secondReading4 || 0) - Number(reading.firstReading4 || 0)) +
                               (Number(reading.secondReading5 || 0) - Number(reading.firstReading5 || 0)) +
                               (Number(reading.secondReading6 || 0) - Number(reading.firstReading6 || 0))) * Number(reading.petrol || 0);
            console.log(`Petrol Money: ${petrolReq}`);

            // 3. DIESEL SALES: (Second - First) * Price
            const dieselReq = ((Number(reading.dieselSecondReading1 || 0) - Number(reading.dieselFirstReading1 || 0)) +
                               (Number(reading.dieselSecondReading2 || 0) - Number(reading.dieselFirstReading2 || 0)) +
                               (Number(reading.dieselSecondReading3 || 0) - Number(reading.dieselFirstReading3 || 0)) +
                               (Number(reading.dieselSecondReading4 || 0) - Number(reading.dieselFirstReading4 || 0)) +
                               (Number(reading.dieselSecondReading5 || 0) - Number(reading.dieselFirstReading5 || 0)) +
                               (Number(reading.dieselSecondReading6 || 0) - Number(reading.dieselFirstReading6 || 0))) * Number(reading.diesel || 0);
            console.log(`Diesel Money: ${dieselReq}`);

            //4. Speed Sales
            const speedReq = ((Number(reading.speedSecondReading1 || 0) - Number(reading.speedFirstReading1 || 0)) +
                              (Number(reading.speedSecondReading2 || 0) - Number(reading.speedFirstReading2 || 0)) +
                              (Number(reading.speedSecondReading3 || 0) - Number(reading.speedFirstReading3 || 0))) * Number(reading.speed || 0);

            // 5. PACKED OIL
            const packedOilMoney = (reading.packedOilEntries || []).reduce((sum, e) => sum + (Number(e.price) || 0), 0);
            console.log(`Packed Oil Total: ${packedOilMoney}`);

            // 6. CREDIT & DEBIT
            const totalCredit = (reading.creditEntries || []).reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
            const totalDebit = (reading.debitEntries || []).reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
            const totalExpenses = (reading.expenseEntries || []).reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
            console.log(`Credits: ${totalCredit}, Debits: ${totalDebit}, Expenses: ${totalExpenses}`);

            // 7. TEST QUANTITIES (Liters)
           const petrolTestMoney = Number(reading.petrolTestQuantity || 0) * Number(reading.petrol || 0);
            const dieselTestMoney = Number(reading.dieselTestQuantity || 0) * Number(reading.diesel || 0);
            const speedTestMoney = Number(reading.speedTestQuantity || 0) * Number(reading.speed || 0);
            const totalTestMoney = petrolTestMoney + dieselTestMoney + speedTestMoney;
            
            console.log(`Test Money Subtracted: ${totalTestMoney}`);

            // 8. DENOMINATIONS
            const totalDenomination = (
                (Number(reading.note500 || 0) * 500) + (Number(reading.note200 || 0) * 200) +
                (Number(reading.note100 || 0) * 100) + (Number(reading.note50 || 0) * 50) +
                (Number(reading.note20 || 0) * 20) + (Number(reading.note10 || 0) * 10) +
                (Number(reading.note5 || 0) * 5) + Number(reading.coins || 0)
            );
            console.log(`Cash Denominations: ${totalDenomination}`);

            // THE FINAL FORMULA PROVIDED BY YOU:
            // (Oil + Petrol + Diesel + Water + Acid + Packed + Credit) - (Debit + Tests + Denomination)
            
            const requiredmoney = (oilReq + petrolReq + dieselReq + speedReq + packedOilMoney + totalDebit ) - (totalCredit + totalExpenses + totalTestMoney);
            const result = ( totalDenomination - requiredmoney);
             console.log(`required money: ${requiredmoney}`);
            console.log(`FINAL CALCULATION RESULT: ${result}`);
            console.log(`--------------------------------------`);

            return {
                staffName: name,
                required: requiredmoney.toFixed(2),
                collected: totalDenomination.toFixed(2),
                excessShot: result.toFixed(2)
            };
        });

        res.status(200).json(report);
    } catch (error) {
        console.error("CRITICAL ERROR:", error);
        res.status(500).json({ message: 'Error' });
    }
});

app.get('/api/transactions/packedOil', async (req, res) => {
    try {
        const { fromDate, toDate, oilType } = req.query;
        let query = {};

        if (fromDate && toDate) {
            query.currentDate = { $gte: fromDate, $lte: toDate };
        }
         const allStaff = await Staff.find({});
        const staffMap = {};
        allStaff.forEach(s => {
            staffMap[s.staffId] = s.name;
        });
        // Fetch readings and only the necessary fields
        const readings = await Reading.find(query).select('currentDate packedOilEntries selectedId');

        let history = [];

        readings.forEach(reading => {
            if (reading.packedOilEntries && reading.packedOilEntries.length > 0) {
                reading.packedOilEntries.forEach(entry => {
                    // Filter by oil type if requested
                    if (!oilType || oilType === 'All' || entry.name === oilType) {
                        history.push({
                            date: reading.currentDate,
                            staffName: staffMap[reading.selectedId] || reading.selectedId,
                            name: entry.name,
                            quantity: entry.amount,
                            price: entry.price,
                            total: entry.price.toFixed(2)
                        });
                    }
                });
            }
        });

        // Sort by date descending
        history.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching packed oil history:', error);
        res.status(500).json({ message: 'Failed to fetch history', error: error.message });
    }
});

// API Endpoint to fetch credit/debit transactions for view_transactions.html (UPDATED)
app.get('/api/transactions/creditDebit', async (req, res) => {
    try {
        const { fromDate, toDate, staffId, partyName } = req.query;
        let query = {};

        if (fromDate && toDate) {
            query.currentDate = { $gte: fromDate, $lte: toDate };
        }

        if (staffId && staffId !== 'All Staff') {
            query.selectedId = staffId;
        }

        // UPDATED: Added 'expenseBankEntries' to the .select() method
        let readingsQuery = Reading.find(query).select('currentDate creditEntries debitEntries expenseEntries debitBankEntries expenseBankEntries selectedId');

        const readings = await readingsQuery;
        const transactionsByDate = {};

        readings.forEach(reading => {
            const date = reading.currentDate;
            const staff = reading.selectedId;

            let filteredCredits = [];
            let filteredDebits = [];
            let filteredExpenses = [];
            let filteredBank = [];
            let filteredExpenseBank = []; // NEW: Initialize Expense Bank filter

            // Filter Credits
            if (reading.creditEntries && reading.creditEntries.length > 0) {
                filteredCredits = reading.creditEntries.filter(entry => {
                    return !partyName || entry.name.toLowerCase().includes(partyName.toLowerCase());
                });
            }

            // Filter Debits (Credit Returns)
            if (reading.debitEntries && reading.debitEntries.length > 0) {
                filteredDebits = reading.debitEntries.filter(entry => {
                    return !partyName || entry.name.toLowerCase().includes(partyName.toLowerCase());
                });
            }

            // Filter Expense Entries (Cash)
            if (reading.expenseEntries && reading.expenseEntries.length > 0) {
                filteredExpenses = reading.expenseEntries.filter(entry => {
                    return !partyName || (entry.name && entry.name.toLowerCase().includes(partyName.toLowerCase()));
                });
            }

            // Filter Debit Bank Entries (Credit Return Bank)
            if (reading.debitBankEntries && reading.debitBankEntries.length > 0) {
                filteredBank = reading.debitBankEntries.filter(entry => {
                    return !partyName || (entry.name && entry.name.toLowerCase().includes(partyName.toLowerCase()));
                });
            }

            // NEW: Filter Expense Bank Entries (Expenses Online)
            if (reading.expenseBankEntries && reading.expenseBankEntries.length > 0) {
                filteredExpenseBank = reading.expenseBankEntries.filter(entry => {
                    return !partyName || (entry.name && entry.name.toLowerCase().includes(partyName.toLowerCase()));
                });
            }

            // UPDATED: Include filteredExpenseBank in the existence check
            if (filteredCredits.length > 0 || filteredDebits.length > 0 || filteredExpenses.length > 0 || filteredBank.length > 0 || filteredExpenseBank.length > 0) {
                if (!transactionsByDate[date]) {
                    transactionsByDate[date] = {
                        credits: [],
                        debits: [],
                        expenseEntries: [],
                        debitBankEntries: [],
                        expenseBankEntries: [] // Initialize array
                    };
                }

                filteredCredits.forEach(entry => {
                    transactionsByDate[date].credits.push({ ...entry._doc, staffId: staff });
                });

                filteredDebits.forEach(entry => {
                    transactionsByDate[date].debits.push({ ...entry._doc, staffId: staff });
                });

                filteredExpenses.forEach(entry => {
                    transactionsByDate[date].expenseEntries.push({ ...entry._doc, staffId: staff });
                });

                filteredBank.forEach(entry => {
                    transactionsByDate[date].debitBankEntries.push({ ...entry._doc, staffId: staff });
                });

                // NEW: Push expense bank entries to the date group
                filteredExpenseBank.forEach(entry => {
                    transactionsByDate[date].expenseBankEntries.push({ ...entry._doc, staffId: staff });
                });
            }
        });

        // Sort dates descending
        const sortedDates = Object.keys(transactionsByDate).sort((a, b) => new Date(b) - new Date(a));
        const sortedTransactions = {};
        sortedDates.forEach(date => {
            sortedTransactions[date] = transactionsByDate[date];
        });

        res.status(200).json(sortedTransactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
    }
});

// --- API Endpoints for Reading Data (Existing) ---

// API Endpoint to save a new reading
app.post('/api/saveReading', async (req, res) => {
    try {
        const data = req.body;

        // 1. PRIMARY SAVE: Save the record to the database
        const newReading = new Reading(req.body);
        const savedReading = await newReading.save();

        // 2. CALCULATE TOTAL PUMPED (Everything that exited the nozzle)
        // This is the "Reading Difference" you see on the UI
        const petrolPumped = (Number(data.secondReading1) + Number(data.secondReading2) + Number(data.secondReading3) + Number(data.secondReading4) + Number(data.secondReading5) + Number(data.secondReading6)) - 
                            (Number(data.firstReading1) + Number(data.firstReading2) + Number(data.firstReading3) + Number(data.firstReading4) + Number(data.firstReading5) + Number(data.firstReading6));

        const dieselPumped = (Number(data.dieselSecondReading1) + Number(data.dieselSecondReading2) + Number(data.dieselSecondReading3) + Number(data.dieselSecondReading4) + Number(data.dieselSecondReading5) + Number(data.dieselSecondReading6)) - 
                            (Number(data.dieselFirstReading1) + Number(data.dieselFirstReading2) + Number(data.dieselFirstReading3) + Number(data.dieselFirstReading4) + Number(data.dieselFirstReading5) + Number(data.dieselFirstReading6));

        const speedPumped = (Number(data.speedSecondReading1) + Number(data.speedSecondReading2) + Number(data.speedSecondReading3)) - 
                           (Number(data.speedFirstReading1) + Number(data.speedFirstReading2) + Number(data.speedFirstReading3));

        // 3. APPLY TO TANK STOCK
        // FIRST: Decrease stock by the total amount pumped out
        await TankStock.updateOne({ fuelType: 'Petrol' }, { $inc: { currentLiters: -petrolPumped } });
        await TankStock.updateOne({ fuelType: 'Diesel' }, { $inc: { currentLiters: -dieselPumped } });
        await TankStock.updateOne({ fuelType: 'Speed' }, { $inc: { currentLiters: -speedPumped } });

        // SECOND: Increase stock by the Test Quantity (it is poured back into the tank)
        if (data.petrolTestQuantity > 0) {
            await TankStock.updateOne({ fuelType: 'Petrol' }, { $inc: { currentLiters: Number(data.petrolTestQuantity) } });
        }
        if (data.dieselTestQuantity > 0) {
            await TankStock.updateOne({ fuelType: 'Diesel' }, { $inc: { currentLiters: Number(data.dieselTestQuantity) } });
        }
        if (data.speedTestQuantity > 0) {
            await TankStock.updateOne({ fuelType: 'Speed' }, { $inc: { currentLiters: Number(data.speedTestQuantity) } });
        }

        // 4. OIL INVENTORY UPDATE (Existing logic)
        if (data.packedOilEntries && data.packedOilEntries.length > 0) {
            for (const entry of data.packedOilEntries) {
                await OilStock.findOneAndUpdate(
                    { type: entry.name }, 
                    { $inc: { quantity: -entry.amount } }
                );
            }
        }

        res.status(201).json(savedReading);

    } catch (error) {
        console.error('Error saving reading:', error);
        res.status(500).json({ message: 'Error saving reading', error: error.message });
    }
});

// API Endpoint to get a single reading by _id (GET request for view.html and edit.html)
app.get('/api/reading/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const reading = await Reading.findById(id);
        if (!reading) {
            return res.status(404).json({ message: 'Reading not found' });
        }
        res.status(200).json(reading);
    } catch (error) {
        console.error('Error fetching reading:', error);
        res.status(500).json({ message: 'Error fetching reading', error: error.message });
    }
});

// NEW: API Endpoint to delete multiple readings at once
app.post('/api/readings/bulk-delete', async (req, res) => {
    try {
        const { ids } = req.body; // Expects ['id1', 'id2', ...]
        if (!ids || ids.length === 0) return res.status(400).send('No IDs provided');

        await Reading.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: 'Selected records deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting records' });
    }
});

// API Endpoint to search readings by date and/or ID (GET request for admin.html)
app.get('/api/readings', async (req, res) => {
    try {
        const { searchDate, searchId, limit } = req.query; // Get limit from query
        let filter = {};

        if (searchDate) {
            filter.currentDate = searchDate;
        }
        if (searchId) {
            filter.selectedId = searchId;
        }

        let query = Reading.find(filter).sort({ timestamp: -1 });

        // Apply limit if provided and not "0" (which means 'All')
        if (limit && limit !== "0") {
            query = query.limit(parseInt(limit));
        }

        const readings = await query;
        res.status(200).json(readings);
    } catch (error) {
        console.error('Error fetching readings:', error);
        res.status(500).json({ message: 'Error fetching readings', error: error.message });
    }
});

// API Endpoint to delete a reading by _id
app.delete('/api/readings/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Find the record first to get the values before they are gone
        const record = await Reading.findById(id);

        if (!record) {
            return res.status(404).json({ message: 'Reading not found' });
        }

        // 2. Calculate the Total Pumped (Meter Differences) to ADD back to stock
        const petrolDiff = (Number(record.secondReading1 || 0) + Number(record.secondReading2 || 0) + Number(record.secondReading3 || 0) + Number(record.secondReading4 || 0) + Number(record.secondReading5 || 0) + Number(record.secondReading6 || 0)) - 
                          (Number(record.firstReading1 || 0) + Number(record.firstReading2 || 0) + Number(record.firstReading3 || 0) + Number(record.firstReading4 || 0) + Number(record.firstReading5 || 0) + Number(record.firstReading6 || 0));

        const dieselDiff = (Number(record.dieselSecondReading1 || 0) + Number(record.dieselSecondReading2 || 0) + Number(record.dieselSecondReading3 || 0) + Number(record.dieselSecondReading4 || 0) + Number(record.dieselSecondReading5 || 0) + Number(record.dieselSecondReading6 || 0)) - 
                          (Number(record.dieselFirstReading1 || 0) + Number(record.dieselFirstReading2 || 0) + Number(record.dieselFirstReading3 || 0) + Number(record.dieselFirstReading4 || 0) + Number(record.dieselFirstReading5 || 0) + Number(record.dieselFirstReading6 || 0));

        const speedDiff = (Number(record.speedSecondReading1 || 0) + Number(record.speedSecondReading2 || 0) + Number(record.speedSecondReading3 || 0)) - 
                         (Number(record.speedFirstReading1 || 0) + Number(record.speedFirstReading2 || 0) + Number(record.speedFirstReading3 || 0));

        // 3. REVERSE STOCK CHANGES
        
        // A. Increase stock by the Meter Difference (returning pumped fuel to the tank)
        await TankStock.updateOne({ fuelType: 'Petrol' }, { $inc: { currentLiters: petrolDiff } });
        await TankStock.updateOne({ fuelType: 'Diesel' }, { $inc: { currentLiters: dieselDiff } });
        await TankStock.updateOne({ fuelType: 'Speed' }, { $inc: { currentLiters: speedDiff } });

        // B. Decrease stock by the Test Quantities (removing the fuel that was "poured back" in)
        if (record.petrolTestQuantity > 0) {
            await TankStock.updateOne({ fuelType: 'Petrol' }, { $inc: { currentLiters: -Number(record.petrolTestQuantity) } });
        }
        if (record.dieselTestQuantity > 0) {
            await TankStock.updateOne({ fuelType: 'Diesel' }, { $inc: { currentLiters: -Number(record.dieselTestQuantity) } });
        }
        if (record.speedTestQuantity > 0) {
            await TankStock.updateOne({ fuelType: 'Speed' }, { $inc: { currentLiters: -Number(record.speedTestQuantity) } });
        }

        // 4. Finally, delete the record from the database
        await Reading.findByIdAndDelete(id);

        res.status(200).json({ message: 'Reading deleted and stock reverted successfully' });
    } catch (error) {
        console.error('Error deleting entry:', error);
        res.status(500).json({ message: 'Error deleting entry', error: error.message });
    }
});

// API Endpoint to fetch credit/debit transactions for view_transactions.html
app.get('/api/transactions/creditDebit', async (req, res) => {
    try {
        const { fromDate, toDate, staffId } = req.query;
        let query = {};

        if (fromDate && toDate) {
            // Assuming currentDate in schema is stored as a string in 'YYYY-MM-DD' format
            // Adjust if your currentDate in the Reading schema is stored as a Date object.
            query.currentDate = { $gte: fromDate, $lte: toDate };
        }

        if (staffId && staffId !== 'All Staff') {
            query.selectedId = staffId;
        }

        // Fetch readings that have either creditEntries or debitEntries,
        // and select only the necessary fields
        const readings = await Reading.find(query).select('currentDate creditEntries debitEntries selectedId');

        // Process the readings to group transactions by date and separate credits/debits
        const transactionsByDate = {};
        readings.forEach(reading => {
            const date = reading.currentDate;
            if (!transactionsByDate[date]) {
                transactionsByDate[date] = {
                    credits: [],
                    debits: []
                };
            }
            if (reading.creditEntries && reading.creditEntries.length > 0) {
                reading.creditEntries.forEach(entry => {
                    transactionsByDate[date].credits.push({
                        ...entry._doc, // Include all fields from the subdocument
                        staffId: reading.selectedId // Include staffId for filtering/display
                    });
                });
            }
            if (reading.debitEntries && reading.debitEntries.length > 0) {
                reading.debitEntries.forEach(entry => {
                    transactionsByDate[date].debits.push({
                        ...entry._doc, // Include all fields from the subdocument
                        staffId: reading.selectedId // Include staffId for filtering/display
                    });
                });
            }
        });

        // Sort dates in descending order for display
        const sortedDates = Object.keys(transactionsByDate).sort((a, b) => new Date(b) - new Date(a));
        const sortedTransactions = {};
        sortedDates.forEach(date => {
            sortedTransactions[date] = transactionsByDate[date];
        });

        res.status(200).json(sortedTransactions);
    } catch (error) {
        console.error('Error fetching credit/debit transactions:', error);
        res.status(500).json({ message: 'Failed to fetch credit/debit transactions', error: error.message });
    }
});

app.put('/api/reading/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;

        // 1. Get the current entry from the database before it is updated
        const oldEntry = await Reading.findById(id);
        if (!oldEntry) {
            return res.status(404).json({ message: 'Reading not found' });
        }

        // --- PART A: TANK STOCK SYNCHRONIZATION ---
        
        // Helper to calculate total liters sold for a specific fuel type
        const getFuelSales = (data, type) => {
            let total = 0;
            if (type === 'speed') {
                for (let i = 1; i <= 3; i++) {
                    total += (Number(data[`speedSecondReading${i}`] || 0) - Number(data[`speedFirstReading${i}`] || 0));
                }
                total -= Number(data.speedTestQuantity || 0);
            } else if (type === 'diesel') {
                for (let i = 1; i <= 6; i++) {
                    total += (Number(data[`dieselSecondReading${i}`] || 0) - Number(data[`dieselFirstReading${i}`] || 0));
                }
                total -= Number(data.dieselTestQuantity || 0);
            } else { // petrol
                for (let i = 1; i <= 6; i++) {
                    total += (Number(data[`secondReading${i}`] || 0) - Number(data[`firstReading${i}`] || 0));
                }
                total -= Number(data.petrolTestQuantity || 0);
            }
            return total;
        };

        // Calculate differences: (Old Sale - New Sale)
        // If Old > New: Sale decreased, so we ADD back the difference to stock.
        // If New > Old: Sale increased, so we SUBTRACT the difference from stock.
        const diffP = getFuelSales(oldEntry, 'petrol') - getFuelSales(newData, 'petrol');
        const diffD = getFuelSales(oldEntry, 'diesel') - getFuelSales(newData, 'diesel');
        const diffS = getFuelSales(oldEntry, 'speed') - getFuelSales(newData, 'speed');

        // Apply differences to TankStock
        await TankStock.findOneAndUpdate({ fuelType: 'Petrol' }, { $inc: { currentLiters: diffP } });
        await TankStock.findOneAndUpdate({ fuelType: 'Diesel' }, { $inc: { currentLiters: diffD } });
        await TankStock.findOneAndUpdate({ fuelType: 'Speed' }, { $inc: { currentLiters: diffS } });


        // --- PART B: PACKED OIL SYNCHRONIZATION ---

        // 2. REVERT: Add the old quantities back into the OilStock
        if (oldEntry.packedOilEntries && oldEntry.packedOilEntries.length > 0) {
            for (const item of oldEntry.packedOilEntries) {
                await OilStock.findOneAndUpdate(
                    { type: item.name },
                    { $inc: { quantity: item.amount } }
                );
            }
        }

        // 3. APPLY: Subtract the new quantities from the OilStock
        if (newData.packedOilEntries && newData.packedOilEntries.length > 0) {
            for (const item of newData.packedOilEntries) {
                await OilStock.findOneAndUpdate(
                    { type: item.name },
                    { $inc: { quantity: -item.amount } }
                );
            }
        }

        // --- PART C: UPDATE THE DOCUMENT ---

        // 4. Update the reading document with the new data
        const updatedReading = await Reading.findByIdAndUpdate(id, newData, { 
            new: true, 
            runValidators: true 
        });

        res.status(200).json(updatedReading);
    } catch (error) {
        console.error('Error updating reading and stock:', error);
        res.status(500).json({ message: 'Error updating reading', error: error.message });
    }
});
     

// NEW: API Endpoint to get current prices
app.get('/api/prices/current', async (req, res) => {
    try {
        const prices = await Price.getPrices(); // Use the static method to get or create
        res.status(200).json(prices);
    } catch (error) {
        console.error('Error fetching prices:', error);
        res.status(500).json({ message: 'Failed to fetch prices', error: error.message });
    }
});

// NEW: API Endpoint to update prices
app.put('/api/prices/update', async (req, res) => {
    try {
        // Change this line to include speedPrice
        const { petrolPrice, dieselPrice, oilPrice, speedPrice } = req.body;

        const updatedPrices = await Price.findOneAndUpdate(
            {}, 
            { petrolPrice, dieselPrice, oilPrice, speedPrice }, // And this line
            { new: true, upsert: true, runValidators: true }
        );
        res.status(200).json(updatedPrices);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update prices', error: error.message });
    }
});

// GET: Fetch all available oil types for the frontend dropdown
app.get('/api/oilStock', async (req, res) => {
    try {
        const stocks = await OilStock.find().sort({ type: 1 });
        res.status(200).json(stocks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching oil stock', error: error.message });
    }
});

// POST: Add a new oil type to the inventory (used in oil_stock.html)
app.post('/api/oilStock', async (req, res) => {
    try {
        const newStock = new OilStock(req.body);
        await newStock.save();
        res.status(201).json(newStock);
    } catch (error) {
        res.status(500).json({ message: 'Error adding stock', error: error.message });
    }
});

// DELETE: Remove an oil type from inventory
app.delete('/api/oilStock/:id', async (req, res) => {
    try {
        await OilStock.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Stock item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting stock' });
    }
});

// PUT: Update an existing oil stock item
app.put('/api/oilStock/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { type, quantity } = req.body;

        const updatedStock = await OilStock.findByIdAndUpdate(
            id,
            { type, quantity },
            { new: true, runValidators: true } // Returns the updated document
        );

        if (!updatedStock) {
            return res.status(404).json({ message: 'Stock item not found' });
        }

        res.status(200).json(updatedStock);
    } catch (error) {
        console.error('Error updating stock:', error);
        res.status(500).json({ message: 'Error updating stock', error: error.message });
    }
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
