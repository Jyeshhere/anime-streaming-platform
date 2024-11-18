const mongoose = require("mongoose");

// مخطط السيرفرات
const serverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    link: { type: String, required: true }
});

const episodeSchema = new mongoose.Schema({
    episodeNumber: { type: Number, required: true },
    episodeTitle: { type: String, required: true },
    episodeDuration: { type: String },
    servers: [serverSchema]
});

const articleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imagePath: { type: String },
    promoLink: { type: String },
    type: [{ type: String }],
    animeType: { 
        type: String, 
        enum: ["فلم", "اوفا", "مسلسل", "اونا", "حلقه"], 
        required: true 
    },
    status: { 
        type: String, 
        enum: ["متوقف", "مستمر", "مكتمل"], 
        required: true 
    },
    episodeDuration: { type: String },
    totalEpisodes: { type: Number },
    season: { type: String },
    source: { type: String },
    latestEpisode: { type: String },
    episodes: [episodeSchema]
}, { timestamps: true });


const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
