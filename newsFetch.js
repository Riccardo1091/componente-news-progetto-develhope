const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const cors = require("cors")
app.use(cors())

const newspapers = [
    { name: 'everyeye', address: 'https://www.everyeye.it/notizie/', base: '' },
    { name: 'multiplayer', address: 'https://multiplayer.it/articoli/notizie/', base: 'https://multiplayer.it' },
    { name: 'spaziogames', address: 'https://www.spaziogames.it/videogiochi/news/?piattaforma=pc&genere=#', base: '' }
]
const articles = []

// Avvio app multiplo
newspapers.forEach(newspaper => {
    // axios lancia una premise che va gestita con il then
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            //cheerio carica tutto l'html ricevuto
            const $ = cheerio.load(html)

            switch (newspaper.name) {
                case 'everyeye':
                    $('.fvideogioco').each((i, el) => {
                        const thumbnail = $(el).find('img').attr('data-src')
                        const title = $(el).find('.testi_notizia a h2').text()
                        const subtitle = $(el).find('.testi_notizia p').text()
                        const url = $(el).find('a').attr('href')

                        articles.push({
                            title,
                            subtitle,
                            thumbnail,
                            url,
                            source: newspaper.name
                        })
                    })
                    break;
                case 'multiplayer':
                    $('div.media').each((i, el) => {
                        const pre_thumbnail = $(el).find('img').attr('data-src')
                        const thumbnail = `${pre_thumbnail.split("g_")[0]}g_190x130_crop_upscale_q85.jpg`
                        const title = $(el).find('.media-body a').text().trim()
                        const subtitle = $(el).find('.media-body > p').text()
                        const url = $(el).find('a').attr('href')

                        articles.push({
                            title,
                            subtitle,
                            thumbnail,
                            url: newspaper.base + url,
                            source: newspaper.name
                        })
                    })
                    break;
                default:
                    $('section .row .col-12 article').each((i, el) => {
                        const thumbnail = $(el).find('.img_background img').attr('data-src')
                        const title = $(el).find('.post_template_standard > div:last-of-type .post_template_standard_text a h4').text()
                        const subtitle = $(el).find('.post_template_standard > div:last-of-type .post_template_standard_text .post_template_excerpt').text()
                        const url = $(el).find('.post_template_standard > div:last-of-type .post_template_standard_text a').attr('href')

                        articles.push({
                            title,
                            subtitle,
                            thumbnail,
                            url,
                            source: newspaper.name
                        })
                    })
            }
        }).catch(e => console.log(e))
})

app.get('/', (req, res) => {
    res.json('Api news base')
})

app.get('/news', (req, res) => {
    res.json(articles)
})

// Avvio app su singolo giornale attraverso URL
app.get('/news/:newspaperId', (req, res) => {
    // req.params.newspaperId è il valore ottenuto scrivendo qualcosa dopo lo slash nel browser se abbiamo usato i due punti nel get
    const newspaperId = req.params.newspaperId
    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    // abbiamo ridichiarato la base per via dello scope limitato a questa specifica funzione
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base

    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            //cheerio carica tutto l'html ricevuto
            const $ = cheerio.load(html)
            // per via dello scope dobbiamo dichiarare la cariabile articles nuovamente qui dentro
            const specificArticles = []
            // a seconda della testata cerchiamo elementi diversi
            switch (newspaperId) {
                case 'everyeye':
                    $('.fvideogioco').each((i, el) => {
                        const thumbnail = $(el).find('img').attr('data-src')
                        const title = $(el).find('.testi_notizia a h2').text()
                        const subtitle = $(el).find('.testi_notizia p').text()
                        const url = $(el).find('a').attr('href')

                        articles.push({
                            title,
                            subtitle,
                            thumbnail,
                            url: newspaperBase + url,
                            source: newspaperId
                        })
                    })
                    break;
                case 'multiplayer':
                    $('div.media').each((i, el) => {
                        const thumbnail = $(el).find('figure img').attr('data-src')
                        const title = $(el).find('.media-body .media-heading').text().trim()
                        const subtitle = $(el).find('.media-body > p').text()
                        const url = $(el).find('a').attr('href')

                        articles.push({
                            title,
                            subtitle,
                            thumbnail,
                            url: newspaperBase + url,
                            source: newspaperId
                        })
                    })
                    break;
                default:
                    $('section .row .col-12 article').each((i, el) => {
                        const thumbnail = $(el).find('.img_background img').attr('data-src')
                        const title = $(el).find('.post_template_standard > div:last-of-type .post_template_standard_text a h4').text()
                        const subtitle = $(el).find('.post_template_standard > div:last-of-type .post_template_standard_text .post_template_excerpt').text()
                        const url = $(el).find('.post_template_standard > div:last-of-type .post_template_standard_text a').attr('href')

                        articles.push({
                            title,
                            subtitle,
                            thumbnail,
                            url: newspaperBase + url,
                            source: newspaperId
                        })
                    })
            }
            res.json(specificArticles)
        }).catch(e => console.log(e))
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))

