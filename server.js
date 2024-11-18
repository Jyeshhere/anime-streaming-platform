const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const multer = require("multer");
const Article = require("./models/anime");

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static('public')); 

app.use(cors());
app.use(express.json());

// اتصال بقاعدة البيانات
mongoose.connect("mongodb+srv://<URNAME>:<URPASSWORD>@cluster0.21beh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error("Error connecting to MongoDB:", error));

//for imgs
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/imgs');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
//save data in database mongodb
app.post("/anime", upload.single('imagePath'), async (req, res) => {
    try {

        const selectedTypes = Array.isArray(req.body.type) ? req.body.type : (req.body.type ? JSON.parse(req.body.type) : []);
        
        const episodes = Array.isArray(req.body.episodes) ? req.body.episodes : (req.body.episodes ? JSON.parse(req.body.episodes) : []);

        // create anime article
        const newArticle = new Article({
            name: req.body.name,
            imagePath: req.file ? '/imgs/' + req.file.filename : '',
            promoLink: req.body.promoLink,
            type: selectedTypes,
            status: req.body.status,
            episodeDuration: req.body.episodeDuration,
            totalEpisodes: req.body.totalEpisodes,
            animeType: req.body.animeType,
            season: req.body.season,
            source: req.body.source,
            latestEpisode: req.body.latestEpisode,
            episodes: episodes,
        });

        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        console.error("Error saving article:", error);
        res.status(500).json({ message: `Error saving anime to the database. Details: ${error.message}` });
    }
});





app.post("/anime/:id/episodes", async (req, res) => {

    try {
        const animeId = req.params.id; 
        const { episodeNumber, episodeTitle, episodeDuration, servers } = req.body;

        const anime = await Article.findById(animeId);

        if (!anime) {
            return res.status(404).json({ message: "أنمي غير موجود." });
        }

        if (!Array.isArray(servers)) {
            return res.status(400).json({ message: "Servers must be an array." });
        }

        //add episode
        const newEpisode = {
            episodeNumber,
            episodeTitle,
            episodeDuration,
            servers, 
        };

        anime.episodes.push(newEpisode); 
        await anime.save();

        res.status(200).json({ message: "episode added succ   ", anime });
    } catch (error) {
        console.error("error adding episod", error);
        res.status(500).json({ message: " error adding episod" });
    }
});

app.get("/anime/:animeId", async (req, res) => {
    const animeId = req.params.animeId;
    try {
        const anime = await Article.findById(animeId);
        
        if (!anime) {
            return res.status(404).send("Anime not found");
        }
        res.render("episode", { anime });
    } catch (error) {
        console.error("Error fetching anime:", error);
        res.status(500).send("Error retrieving anime.");
    }
});


app.get('/anime/:animeId/episode/:episodeId', async (req, res) => {
    try {
        const { animeId, episodeId } = req.params;

        const anime = await Article.findById(animeId);
        const episode = anime.episodes.id(episodeId); 
        const episodes = anime.episodes; 
        const currentEpisodeIndex = anime.episodes.findIndex(ep => ep._id.toString() === episode._id.toString());
        const previousEpisode = anime.episodes[currentEpisodeIndex - 1] || null;
        const nextEpisode = anime.episodes[currentEpisodeIndex + 1] || null;

        if (!anime || !episode) {
            return res.status(404).send('Episode not found');
        }

        res.render('episodewatch', {
            anime,       
            episode,    
            episodes ,    
            previousEpisode: previousEpisode,
            nextEpisode: nextEpisode,
            episodes: anime.episodes
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


app.get("/animes", async(req,res) => {
    try{
        const latestAnimes =  await Article.find();
    
        res.render("anime",{latestAnimes});

    }catch{
        res.status(500).json({message: "error finding anime"});
    }


});



// get animes
app.get("/anime", async (req, res) => {
    try {
        const animeList = await Article.find().sort(); 
        res.json(animeList); 
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء استرجاع الأنميات." });
    }
});




// render home page with latest anime added
app.get("/", async (req, res) => {
    try {
        const latestAnimes = await Article.find().sort({ createdAt: -1 }).limit(5); 
        res.render("index", { latestAnimes }); 
    } catch (error) {
        console.error("Error fetching latest animes:", error);
        res.render("index", { latestAnimes: [] }); 
    }
});


// run
app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
});
