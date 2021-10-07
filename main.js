///////////////////////////////////////////////////////////////////////////////////////////////////////
//Mobile device (navigator)
const mobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
var windowWidth = -1
//INtro gif
const galleryPlayGif = "img/gallery/spinning_vinyl.gif"
//Genra obj for dyn
const genres = {
    "eurobeat": {
        0: "Eurobeat originated in Europe in the early 1980s.\nThe defining characteristic of eurobeat, besides its overall fast tempo and high energy, is the presence of both a sung chorus and an instrumental chorus (\"sabi\")",
        1: "https://en.wikipedia.org/wiki/Eurobeat"
    },
    "trance": {
        0: "Trance originated in the late 1980s – early 1990s in Europe.\n`Build-up and release` is the one of the main factors to distinct this type of genre from others.",
        1: "https://en.wikipedia.org/wiki/Trance_music"
    },
    "house": {
        0: "The central rhythm is same as Techno, althought the tempo is typicaly between 120/130 (BPM) which is the main difference.\nThe bass drum is sounded on beats one and three, and the snare drum, claps, or other higher-pitched percussion on beats 2 & 4.",
        1: "https://en.wikipedia.org/wiki/House_music"
    },
    "techno": {
        0: "Techno originated in Detroit (US) in the mid-1980s.\nThe central rhythm is often in common time (4/4), while the tempo typically varies between 120/150 beats per minute (BPM)",
        1: "https://en.wikipedia.org/wiki/Techno"
    },
    "trap": {
        0: "Trap (EDM Trap) originated in US in the early 2010s.",
        1: "https://en.wikipedia.org/wiki/Trap_music_(EDM)"
    },
    "game": {
        0: "Mainly, in these cases, game theme tracks.\nRead more about theme music down below.",
        1: "https://en.wikipedia.org/wiki/Theme_music"
    },
    "vocal": {
        0: "The melodic part starts incrementally, combining vocals, usually female, a melodic sound (for the most part high pitched and fast), and a bass pattern. Towards the end of the track, the melody fades out and the intro rhythm returns",
        1: "https://en.wikipedia.org/wiki/Vocal_trance"
    },
    "dubstep": {
        0: "Dubstep originated in Europe in early 2000s.\nThe tempo is nearly always in the range of 138–142 (BPM), with a clap or snare usually inserted every 1/3 beat in a bar",
        1: "https://en.wikipedia.org/wiki/Dubstep"
    }

}
//Header
const headerem = document.getElementById("headerem")
//Input File
var file = document.getElementById("thefile")
const customAudio = document.createElement("audio")
customAudio.id = "audio"
customAudio.crossOrigin = "anonymous"
var audioContext
//Visualiser
var analyser, src, audioContext
var renClassic, renOsici, renCave, renDiamond, renCircle, renMedia
var gradientFill
var landscapeMode = false
//Gallery Listeners
var flagPrev = 0, flagCurr = 0
var originalSrc, fullImagePath, figTitle
var activeListener = [] //activeListener 1 active at the time
var activeTrack = ""
//TypeIt API
var typeItPlayer
var typeItH2
//API
var apiQueArray = []
var apiQueIndex = 0
var apiSearchBox = document.getElementById("searchBox")
var apiInitialListFlag = true
//Drag&Drop 
var draggedFile
//Player
const audioPlayer = document.querySelector(".audio-player")
const timeline = audioPlayer.querySelector(".timeline")
const volumeSlider = audioPlayer.querySelector(".controls .volume-slider")
const repeatBtn = audioPlayer.querySelector(".controls .toggle-repeat")
const playBtn = audioPlayer.querySelector(".controls .toggle-play")
const styleBtn = audioPlayer.querySelector(".controls .toggle-style")
const galleryBtn = audioPlayer.querySelector(".controls .toggle-gallery")
const apiBtn = audioPlayer.querySelector(".controls .toggle-api")
const timelineUpdateSpeed = 50 // + transition 0.5s
var initialAudioVol = .35
var styleIndex = 0
var changeInterval, lastChangeInterval = 0
const focusBtn = audioPlayer.querySelector(".controls .toggle-focus")
var canvasFocused = false
//Dynamic Gallery
const dynPathPrefix = "localaudio_db/Dynamic/"
const dynAudioData = {
    "audio": {
        0: "Airbase - Tangerine (Original Mix).mp3",
        1: "Audioscribe - Free Fall.mp3",
        2: "Billy Hendrix - Body Shine.mp3",
        3: "Dr Iggy - Oci boje duge .mp3",
        4: "Dream Wave- Lift Off.mp3",
        5: "Grum - Something About You.mp3",
        6: "Ian Storm & Ron van den Beuken - Clocks.mp3",
        7: "Star Wars - The Force Theme (Far Out).mp3",
        8: "Aurora Borealis - The Milky Way.mp3",
        9: "Dabro - Улетай на крыльях ветра.mp3",
        10: "Virtual Symmetry - The V.S. (Original Mix).mp3",
        11: "Tonca Boys - Meet Us At Tonca (Choir Boys Mix) (2001)",
        12: "Spencer Brown - Nightwalk.mp3",
        13: "Robert Miles - Red Zone (Part 1).mp3",
        14: "Pryda - Bus 605 (Original Mix).mp3",
        15: "PPK - ResuRection (Space Club Mix).mp3",
        16: "Peran Van Dijk - Good Time (Original Mix).mp3",
        17: "Tullio - Rainforest.mp3",
        18: "SRTW ft. Hier - Pictures (Joshua Ellis Remix).mp3",
        19: "Moonwalk - Galactic (Original Mix).mp3",
        20: "EDX - Jaded.mp3",
        21: "Mystic Force - Kalimba.mp3",
        22: "Miss Jane - Its A Fine Day (ATB Club Remix).mp3",
        23: "Dave Rodgers -   Deja Vu.mp3",
        24: "Dave Rodgers - Beat of The Rising Sun.mp3",
        25: "Initial D - Night Of Fire.mp3",
        26: "Toby Ash - Are You Ready.mp3",
        27: "Natalie - Heartbeat.mp3",
        28: "Manuel - Gas Gas Gas.mp3",
        29: "Mad Desire - Stephy Martini.mp3",
        30: "Lou Grant - Don't Stop The Music.mp3",
        31: "Max Coveri - Golden Age.mp3",
        32: "Ken Blast - The Top.mp3",
        33: "Initial D - Speed Lover.mp3",
        34: "Initial D - Rider of the Sky.mp3",
        35: "Tetris Remix.mp3",
        36: "Boris Brejcha - Sad But True.mp3",
        37: "Zеplin - Еntеr Моrdor Original Mix.mp3",
        38: "Tom Wilson - Techno Cat.mp3",
        39: "Charlotte de Witte - Remember.mp3",
        40: "Joyhauser - C166W.mp3",
        41: "DVBBS  Borgeous - Tsunami.mp3",
        42: "David Guetta - Titanium Lyrics ft Sia.mp3",
        43: "Darude - Sandstorm (Leon Martell Remix).mp3",
        44: "Cosmic Gate - Exploration Of Space.mp3",
        45: "Faithless - Insomnia.mp3",
        46: "Sash - Ecuador.mp3",
        47: "John B - All Night.mp3",
        48: "Maneo - Beast Within.mp3",
        49: "Jeckyll & Hyde - Frozen Flame.mp3",
        50: "Moby - Why Does My Heart Feel So Bad (Ferry Corsten Remix) (1999).mp3",
        51: "Ana Criado - In A Thousand Skies (Dan Stone).mp3",
        52: "Above  Beyond - Gareth Emery Presents (OceanLab).mp3",
        53: "Lost Witness & Tracey Carmen - Red Sun Rising.mp3",
        54: "Above and Beyond - Lonely Girl (Gareth Emery).mp3",
        55: "Cressida - 6 A.M. (Kyau & Albert).mp3",
        56: "Iggy Azalea feat Rita Ora - Black Widow .mp3",
        57: "Dr Dre - The Next Episode (San Holo).mp3",
        58: "Gioni -Trigger.mp3",
        59: "Veorra - Run.mp3",
        60: "Meric - Take Off (feat. Paul Rey).mp3",
        61: "R.A.F - In 2 My Life (Magic Zone Mix).mp3",
        62: "R.A.F. - Just Take Me Higher.mp3",
        63: "The Organism - Glossolalia.mp3",
        64: "Uncle John From Jamaica (M.I.K.E Remix).mp3",
        65: "Datura - Eternity (Samsara) 1993.mp3",
        66: "DJ Kim - Jetlag (Alphazone Remix) (2001).mp3",
        67: "Bedrock - Set In Stone (1996).mp3",
        68: "Igal M - I Still Like It.mp3",
        69: "Delerium Tiesto ft. Sarah McLachlan - Silence.mp3",
        70: "John Johnson - Buenos Aires (Original Mix).mp3",
        71: "King & Queen - Special Queen.mp3",
        72: "DJ Jamo & Jack Knives - Seastar II (Remix) (1995).mp3",
        73: "Katana - Silence (Signum Remix) (1999).mp3",
        74: "Above & Beyond ft. Gemma Hayes - Counting Down The Days (WYOMI Remix).mp3",
        75: "Oliver Smith - Shadows.mp3",
        76: "Pegboard Nerds feat. Elizaveta - Hero (Teminite Remix).mp3",
        77: "Aero Chord - Surface.mp3",
        78: "Bolier, Divolly & Markward - Cafe (ft. Lena Kovacevic & C.Sen).mp3",
        79: "Initial D - Running in The 90s (Okamio Remix).mp3",
        80: "Astronomia - Tony Igy ( Eurobeat).mp3",
        81: "Dejo - Lightning over Japan.mp3"
    },
    "image": {
        0: "img/gallery/tangerine.jpg",
        1: "img/gallery/ncs.jpg",
        2: "img/gallery/body_shine.jpg",
        3: "img/gallery/dr_iggy.jpg",
        4: "img/gallery/lift_off.jpg",
        5: "img/gallery/anjuna_1.jpg",
        6: "img/gallery/clocks.jpg",
        7: "img/gallery/star_wars.jpg",
        8: "img/gallery/milky_way.png",
        9: "img/gallery/dabrojpg.jpg",
        10: "img/gallery/symmetry.jpg",
        11: "img/gallery/tonca.jpg",
        12: "img/gallery/nightwalk.jpg",
        13: "img/gallery/red_zone.png",
        14: "img/gallery/pryda.jpg",
        15: "img/gallery/resurestion_ppk.jpg",
        16: "img/gallery/good_time.jpg",
        17: "img/gallery/rainforest.jpg",
        18: "img/gallery/pictures.jpeg",
        19: "img/gallery/moonwalk.jpg",
        20: "img/gallery/jaded.jpeg",
        21: "img/gallery/kalimba.jpg",
        22: "img/gallery/fine_day.jpg",
        23: "img/gallery/deja_vu_rodgers.jpg",
        24: "img/gallery/beat_of_the_rising_sun.jpg",
        25: "img/gallery/night_of_fire.jpg",
        26: "img/gallery/are_you_ready.jpg",
        27: "img/gallery/heartbeat.jpg",
        28: "img/gallery/gas_gas_gas.jpg",
        29: "img/gallery/mad_desire.jpg",
        30: "img/gallery/dont_stop_the_music.jpg",
        31: "img/gallery/initiald_90s.jpg",
        32: "img/gallery/the_top.jpg",
        33: "img/gallery/initiald_90s.jpg",
        34: "img/gallery/initiald_90s.jpg",
        35: "img/gallery/tetris.jpg",
        36: "img/gallery/sad_but_true.jpg",
        37: "img/gallery/enter_mordor.jpg",
        38: "img/gallery/techno_cat.jpg",
        39: "img/gallery/remember_charllote.jpg",
        40: "img/gallery/c116w.jpg",
        41: "img/gallery/tsunami_dvbbs.jpg",
        42: "img/gallery/titanium.png",
        43: "img/gallery/sandstorm.jpg",
        44: "img/gallery/exploration_of_space.jpg",
        45: "img/gallery/insomnia_faithless.jpg",
        46: "img/gallery/ecuador.jpg",
        47: "img/gallery/all_night_johnb.jpg",
        48: "img/gallery/beast_within.jpg",
        49: "img/gallery/frozen_flame.jpg",
        50: "img/gallery/why_does_my_heart_feel_so_bad.jpg",
        51: "img/gallery/thousand_skies.jpg",
        52: "img/gallery/anjuna_2.jpg",
        53: "img/gallery/red_sun_rising.jpg",
        54: "img/gallery/anjuna_3.jpg",
        55: "img/gallery/6am.jpg",
        56: "img/gallery/black_widow.jpg",
        57: "img/gallery/san_holo_logo.jpg",
        58: "img/gallery/gionni_trigger.jpg",
        59: "img/gallery/veorra_run.jpg",
        60: "img/gallery/take_off_meric.png",
        61: "img/gallery/in2mylife.jpg",
        62: "img/gallery/just_take_me_higher.png",
        63: "img/gallery/glossolalia.png",
        64: "img/gallery/vengaboys_unclejohnfromjamaica.png",
        65: "img/gallery/datura_eternity.png",
        66: "img/gallery/jet_lag.jpg",
        67: "img/gallery/set_in_stone_.jpg",
        68: "img/gallery/igalm_likeit.png",
        69: "img/gallery/delerium.jpg",
        70: "img/gallery/buenos_aires.jpg",
        71: "img/gallery/king&queen.jpg",
        72: "img/gallery/seastar.png",
        73: "img/gallery/katana.png",
        74: "img/gallery/above&beyond_counting.jpg",
        75: "img/gallery/oliversmith_shadows.png",
        76: "img/gallery/pegboardners_hero.jpg",
        77: "img/gallery/aerochord_surface.png",
        78: "img/gallery/lena_cafe.jpg",
        79: "img/gallery/initiald_90s.jpg",
        80: "img/gallery/astronomia.jpg",
        81: "img/gallery/dejo_overjapan.png"
    },
    "style": {
        0: "trance",
        1: "dnb",
        2: "house",
        3: "vocal",
        4: "trance",
        5: "house",
        6: "house",
        7: "trap",
        8: "trance",
        9: "house",
        10: "trance",
        11: "trance",
        12: "trance",
        13: "trance",
        14: "trance",
        15: "trance",
        16: "house",
        17: "house",
        18: "house",
        19: "house",
        20: "house",
        21: "house",
        22: "house",
        23: "eurobeat",
        24: "eurobeat",
        25: "eurobeat",
        26: "eurobeat",
        27: "eurobeat",
        28: "eurobeat",
        29: "eurobeat",
        30: "eurobeat",
        31: "eurobeat",
        32: "eurobeat",
        33: "eurobeat",
        34: "eurobeat",
        35: "techno",
        36: "techno",
        37: "techno",
        38: "techno",
        39: "techno",
        40: "techno",
        41: "techno",
        42: "techno",
        43: "techno",
        44: "techno",
        45: "techno",
        46: "techno",
        47: "techno",
        48: "techno",
        49: "techno",
        50: "vocal",
        51: "vocal",
        52: "vocal",
        53: "vocal",
        54: "vocal",
        55: "vocal",
        56: "trap",
        57: "trap",
        58: "trap",
        59: "trap",
        60: "trap",
        61: "techno",
        62: "UNDEFINED",
        63: "house",
        64: "trance",
        65: "trance",
        66: "trance",
        67: "trance",
        68: "house",
        69: "trance",
        70: "house",
        71: "eurobeat",
        72: "trance",
        73: "trance",
        74: "trap",
        75: "house",
        76: "vocal",
        77: "trap",
        78: "house",
        79: "eurobeat",
        80: "eurobeat",
        81: "eurobeat"
    },
}
const figure = []
const image = []
const figurecap = []
const paragraph = []
const numberOfTracks = Object.keys(dynAudioData["audio"]).length - 2
//Inline Elements
const inlineIntro = document.getElementById("inline-intro")
const inlineGallery = document.getElementById("inline-gallery")
const inlineApi = document.getElementById("inline-api")
const inlineAbout = document.getElementById("inline-about")
const inlineContact = document.getElementById("inline-contact")

//////////////////////////////////////////////////////////////////////////////////////////////////////

//Handle mobile device
//Remove cinematic effect
if (mobileDevice) {
    galleryBtn.remove()
    apiBtn.remove()
    focusBtn.remove()
}
//Fade out player => change to desktops only when in focused mode
if (mobileDevice) {
    let idleTimer = null
    let idleState = false

    function showPlayer(time) {

        clearTimeout(idleTimer)
        if (idleState == true) {
            $("#player").removeClass("inactive")
        }
        idleState = false
        idleTimer = setTimeout(function () {
            $("#player").addClass("inactive")
            idleState = true
        }, time)

    }

    //showPlayer(2000)
    /*$("#tm-video-container").on("touchstart touchmove", function () {
        if ((!customAudio.paused || customAudio.currentTime > 0)) {
            showPlayer(3500)
        }
    })*/
}
//Document ready HTML/DOM & Window Loaded
document.addEventListener('readystatechange', event => {
    // When HTML/DOM elements are ready:
    if (event.target.readyState === "interactive") {   //same as:  ..addEventListener("DOMContentLoaded"..

    }

    // When window loaded ( external resources are loaded too- `css`,`src`, etc...) 
    if (event.target.readyState === "complete") {

        showInlinesInitial()
        $(".tm-container").css("visibility", "visible")
    }
})

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}
function validate() {
    const email = $("#email").val()

    if (validateEmail(email))
        sendEmail()
    else
        mailFormatFail()

    return false
}
function sendEmail() {
    const inputs = document.querySelector("form")

    if (inputs.elements['email'].value != "" && inputs.elements['inquiry'].value != "" && inputs.elements['message'].value != "") {
        Email.send({
            SecureToken: "ec9efb7a-0ac1-4b30-a80b-55d81e0412b6",
            To: 'dario.damjanovic@mail.com',
            From: inputs.elements['email'].value,
            Subject: inputs.elements['inquiry'].value,
            Body: inputs.elements['message'].value
        }).then((message) => {
            var msgString = message
            if (msgString.localeCompare("OK") === 0) {

                inputs.elements['name'].value = "",
                    inputs.elements['email'].value = "",
                    inputs.elements['inquiry'].value = "",
                    inputs.elements['message'].value = "",

                    mailSuccessAlert()

            } else mailFailAlert()

        }).catch(message)(
            console.log("sendEmail() funct msg status: " + message + "!")
        )
    } else mailFailAlert()
}
function mailSuccessAlert() {
    $("#mailSuccess").fadeIn(2000),
        setTimeout(function () {
            $("#mailSuccess").fadeOut('slow')
        }, 5000)
}
function mailFailAlert() {
    $("#mailFail").fadeIn(2000),
        setTimeout(function () {
            $("#mailFail").fadeOut('slow')
        }, 5000)
}
function mailFormatFail() {
    $("#mailFormat").fadeIn(2000),
        setTimeout(function () {
            $("#mailFormat").fadeOut('slow')
        }, 5000)
}
function openDefaultEmailClient() {
    window.location.href = "mailto:user@example.com?subject=Subject&body=message%20goes%20here"
}
function appendGalleryPlaying(trackName, trackStyle) {
    $('#playing-track').remove()
    $('.tm-gallery').append(`
						<div id="playing-track" class="tm-gallery-right-inner" style="padding-top: 5%;">               
							<div class="details" style="align-items: center; justify-content: center;">
									<h4 id="gallery-playing"> Playing:      ${trackName}</h4>
                                    <br>
									<p>      ${genres[trackStyle][0]}</p>    
                                    <a href="${genres[trackStyle][1]}" target="_blank" class="link";">Read More</a>                      
						    </div>
                        </div>
				`)
}

//Input audio file
//Play on Input
file.onchange = function () {
    var files = this.files
    customAudio.src = URL.createObjectURL(files[0])
    activeTrack = this.files[0].name.substring(0, this.files[0].name.lastIndexOf("."))
    showTrackNameOnPlayer()

    customAudio.play()
    initVisualiser()
}
//Play track from local db
function playLocalTrack(localFilePath) {

    async function createFile() {
        if (localFilePath != "") {
            let response = await fetch(localFilePath)
            let data = await response.blob()
            let metadata = {
                type: 'audio/*'
            }
            var fileName = localFilePath.indexOf("/") + 1
            const file = new File([data], fileName, metadata)
            customAudio.src = URL.createObjectURL(file)

            customAudio.play()
        }
    }
    createFile()
    initVisualiser()
}
function checkOrientationChangeForMediaDevices() {
    if (mobileDevice) {

        if (!landscapeMode && window.matchMedia("(orientation: landscape)").matches && windowWidth < 1000) {
            $(".toggle-focus").hide()
            $("#header").hide()
            $("#space-1").hide()
            $("#space-2").hide()
            $("#popups").hide()
            const deviceHeight = $(window).height()
            const deviceWidth = $(window).width()
            $("#tm-video-container").css("height", deviceHeight)
            $("#tm-video-container").css("width", deviceWidth)
            //$("#drag\&drop").css("height", deviceHeight)    gives error?
            landscapeMode = true
            //console.log("Landscape:  " + deviceHeight + " : " + deviceWidth)
        } else if (landscapeMode && window.matchMedia("(orientation: portrait)").matches) {
            $(".toggle-focus").show()
            $("#header").show()
            $("#space-1").show()
            $("#space-2").show()
            $("#popups").show()
            const deviceHeight = $(window).height()
            const deviceWidth = $(window).width()
            landscapeMode = false
            //console.log("Portrait:  " + deviceHeight + " : " + deviceWidth)
        }

    } else {

    }
}
//Visualiser (Audio starts)
function initVisualiser() {

    if (mobileDevice)
        showPlayer()
    showTrackNameOnH2()
    showHeaderGlowOnAudioPlay()

    document.getElementById("dragndropbox").innerHTML = ""
    document.getElementById("drag\&drop").style.border = "1px dashed rgba(2, 154, 192, 0)"


    $("#introImage").attr("src", "img/intro.gif")

    audioContext = new (window.AudioContext || window.webkitAudioContext)()
    src = audioContext.createMediaElementSource(customAudio)
    analyser = audioContext.createAnalyser()

    //analyser.smoothingTimeConstant = 0.87

    analyser.minDecibels = -75
    analyser.maxDecibels = -20

    var canvas = document.getElementById("canvas")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    var ctx = canvas.getContext("2d")

    src.connect(analyser)
    analyser.connect(audioContext.destination)
    //analyser.fftSize = 16384

    var bufferLength = analyser.frequencyBinCount

    //var dataArray = new Float32Array(bufferLength)
    var dataArray = new Uint8Array(bufferLength)

    var WIDTH = canvas.width
    var HEIGHT = canvas.height

    var barWidth = (WIDTH / bufferLength) * 2.5
    var barHeight
    var y = 0, x = 0 //Bar spacing
    var r = 175, g = 200, b = -200

    gradientFill = ctx.createLinearGradient(HEIGHT / 2, WIDTH / 2, 0, 0)
    //circGradientFill = ctx.createRadialGradient(HEIGHT / 2, WIDTH / 2, 10, 750, 0, 800)
    gradientFill.addColorStop("0", "whitesmoke") ///  var to strongen the bass
    gradientFill.addColorStop("0.1", "lightblue")
    gradientFill.addColorStop("1", "blue")
    //gradientFill.addColorStop("1", "white")

    renClassic = function () {
        requestAnimationFrame(renClassic)
        x = 0

        analyser.getByteFrequencyData(dataArray)

        ctx.fillStyle = "rgba(0, 14, 41)"
        ctx.clearRect(0, 0, WIDTH, HEIGHT)

        for (var i = 0; i < bufferLength / 3; i++) {
            barHeight = dataArray[i] * 1.7

            r = barHeight + (25 * i / bufferLength) - 100
            g = barHeight + (i / bufferLength) - 50
            b = barHeight

            checkOrientationChangeForMediaDevices()
            if (document.getElementById("drag&drop").style.height >= "600px")
                barHeight += 100

            ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ", 1)"
            ctx.fillRect((ctx.canvas.width - x), canvas.height - barHeight, barWidth, barHeight + 20)
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight + 20)
            x += barWidth
            ctx.restore()
        }

    }

    const xDistance = 350
    const barHeightAdd = 1.1
    renOsici = function () {
        requestAnimationFrame(renOsici)

        analyser.getByteFrequencyData(dataArray) // getByteTimeDomainData

        ctx.fillStyle = "#000e29";
        ctx.clearRect(0, 0, WIDTH, HEIGHT)
        //ctx.filter = 'blur(7px)'
        //ctx.filter = "drop-shadow(10px 0px 10px white)"

        ctx.lineWidth = 2
        ctx.beginPath()

        var sliceWidth = WIDTH * 1.9 / bufferLength
        var x = 0

        for (var i = 0; i < bufferLength / 8; i++) {

            y = dataArray[i] * barHeightAdd // Bar heigth              

            if (i === 0) {
                ctx.moveTo(x + xDistance, x - y + 500)
            } else {
                ctx.lineTo(x + xDistance, x - y + 500)
            }
            x += sliceWidth
        }
        ctx.strokeStyle = gradientFill
        ctx.stroke()

        x = 0, y = 0
        ctx.beginPath()

        for (var i = 0; i < bufferLength / 8; i++) {

            y = dataArray[i] * barHeightAdd

            checkOrientationChangeForMediaDevices()

            if (i === 0) {
                ctx.moveTo(x + xDistance, (-x - y + 500))
            } else {
                ctx.lineTo(x + xDistance, (-x - y + 500))
            }
            x += sliceWidth
        }
        ctx.strokeStyle = gradientFill
        ctx.stroke()

        x = 0, y = 0
        ctx.beginPath()

        for (var i = 0; i < bufferLength / 8; i++) {

            y = dataArray[i] * barHeightAdd

            checkOrientationChangeForMediaDevices()

            if (i === 0) {
                ctx.moveTo(x + xDistance + 300, (x - y + 200))
            } else {
                ctx.lineTo(x + xDistance + 300, (x - y + 200))
            }
            x += sliceWidth
        }
        ctx.strokeStyle = gradientFill
        ctx.stroke()

        x = 0, y = 0
        ctx.beginPath()

        for (var i = 0; i < bufferLength / 8; i++) {

            y = -dataArray[i] * barHeightAdd

            checkOrientationChangeForMediaDevices()

            if (i === 0) {
                ctx.moveTo(x + xDistance + 300, (-x - y + 800))
            } else {
                ctx.lineTo(x + xDistance + 300, (-x - y + 800))
            }
            x += sliceWidth
        }
        ctx.strokeStyle = gradientFill
        ctx.stroke()
    }

    renCave = function () {
        requestAnimationFrame(renCave)
        x = 0
        barWidth = 2

        analyser.getByteFrequencyData(dataArray) // getByteTimeDomainData    

        //ctx.fillStyle = "rgba(0, 14, 41)"
        ctx.clearRect(0, 0, WIDTH, HEIGHT)

        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 2.5
            /*if (customB != "") {

                ctx.fillStyle = "rgb(" + customR + "," + customG + "," + customB + ")"
            }
            else {*/
            r = barHeight + (25 * i / bufferLength) - 100
            g = barHeight + (i / bufferLength) - 50
            b = barHeight
            ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ", 1)"
            //ctx.fillStyle = gradientFill
            //}
            //ctx.fillStyle = "rgb(255, 255, 255)"
            //Focus on -> resizing canvas making bars bigger
            checkOrientationChangeForMediaDevices()
            if (document.getElementById("drag&drop").style.height >= "600px")
                barHeight += 100

            ctx.fillRect((ctx.canvas.width - x) - canvas.width / 2, (canvas.height + barHeight) / 2, barWidth, -barHeight)
            ctx.fillRect(x + canvas.width / 2 - 7, (canvas.height - barHeight) / 2, barWidth, barHeight)
            //audioPlayer.style.boxShadow = "inset 0px -3px 5px 0px" + " rgb(" + r + "," + r + "," + b + ")"

            x += barWidth
            ctx.restore()
        }
    }

    renDiamond = function () {
        requestAnimationFrame(renDiamond)
        x = 0

        analyser.getByteFrequencyData(dataArray)

        ctx.fillStyle = "#000e29"
        ctx.clearRect(0, 0, WIDTH, HEIGHT)

        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 1.2

            r = barHeight + (25 * (i / bufferLength)) - 180
            g = 450 * (i / bufferLength)
            b = 200
            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")"
            //}
            //ctx.fillRect( x  / 4, canvas.height / 2          , barWidth , barHeight);
            ctx.fillRect(x / 4 + canvas.width / 2, (canvas.height / 2), barWidth, barHeight)
            //audioPlayer.style.boxShadow = "inset 0px -3px 5px 0px" + " rgb(" + r + "," + r + "," + b + ")"

            x += barWidth
            ctx.restore()
        }

    }

    renCircle = function () {
        requestAnimationFrame(renCircle)
        x = 0

        analyser.getByteFrequencyData(dataArray)
        ctx.fillStyle = "#000e29"
        ctx.clearRect(0, 0, WIDTH, HEIGHT)

        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 2
            ctx.save()
            ctx.translate(canvas.width / 2, canvas.height / 2)
            ctx.rotate(i / bufferLength * 9.55)
            r = barHeight + (25 * (i / bufferLength)) - 80
            g = 250 * (i / bufferLength)
            b = 200

            ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ", 1)"
            ctx.fillRect(barWidth / 2, barWidth / 2, barWidth, barHeight)
            x += barWidth
            ctx.restore()
        }
    }

    const centerHeight = 474
    var tempOpacity = 0, rafCount = 0
    renMedia = function () {
        requestAnimationFrame(renMedia)
        x = 0

        analyser.getByteFrequencyData(dataArray)

        ctx.fillStyle = "rgba(0, 14, 41)"
        ctx.clearRect(0, 0, WIDTH, HEIGHT)

        checkOrientationChangeForMediaDevices()

        for (var i = 0; i < bufferLength / 4.99; i++) {
            barHeight = dataArray[i] * 2.25

            r = barHeight + (25 * i / bufferLength) - 500
            g = barHeight + (i / bufferLength) - 150
            b = barHeight

            if (barHeight > 350)
                r = 50
            g += i

            //ctx.fillRect((ctx.canvas.width - x), canvas.height - barHeight, barWidth, barHeight + 20)
            if (canvasFocused) {

                ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + tempOpacity + ")"

                ctx.fillRect(canvas.width - x , canvas.height - barHeight - 550 , barWidth, barHeight)
                ctx.fillRect(x , canvas.height - barHeight - 550 , barWidth, barHeight)
                ctx.fillRect(canvas.width - x , canvas.height / 2 , barWidth, barHeight)
                ctx.fillRect(x , canvas.height / 2 , barWidth, barHeight)

                if (rafCount % 1000 && tempOpacity < 1) {
                    tempOpacity += 0.00002
                }
                rafCount++
            }
            else {
                ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ", 1)";
                ctx.fillRect(canvas.width - x, canvas.height - barHeight, barWidth, barHeight + 20)
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight + 20)
                tempOpacity = 0
                rafCount = 0
            }

            x += barWidth
            ctx.restore()

        }
    }

    customAudio.play()
    requestAnimationFrame(renMedia) //renCave     must be first if not change styleBtn event switch
}
//Header typeIt
function showHeaderText() {
    document.getElementById("headerem").style.opacity = "1";
    typeItH2 = new TypeIt("#headerem", {
        speed: 50,
        lifeLike: true,
        waitUntilVisible: true,
        //Remove cursor
        afterComplete: function (step, instance) {
            setTimeout(() => {
                typeItH2.destroy()
            }, 2000);
        }
    }).go()
}

function showTrackNameOnH2() {
    if (typeItH2 !== undefined) {
        typeItH2.freeze()
        typeItH2.reset()
    }

    document.getElementById("headerem").innerHTML = ""

    typeItH2 = new TypeIt("#headerem", {
        speed: 100,
        lifeLike: true,
        waitUntilVisible: true,
        strings: activeTrack,
        afterComplete: function (step, instance) {
            setTimeout(() => {
                typeItH2.destroy()
            }, 1250);
        }
    }).go()
}

function showTrackNameOnPlayer() {
    if (typeItPlayer !== undefined) {
        typeItPlayer.freeze()
        typeItPlayer.reset()
    }
    var string = [this.activeTrack]
    document.getElementById("playerTrackDiv").innerHTML = ""
    if (string[0].length > 40)
        string[0] = string[0].substring(0, 40) + "..."

    typeItPlayer = new TypeIt("#playerTrackDiv", {
        speed: 80,
        waitUntilVisible: true,
        nextStringDelay: 750,
        strings: string,
        afterComplete: function (step, instance) {
            typeItPlayer.destroy();
        }
    }).go()
}
function showHeaderGlowOnAudioPlay() {
    //$("#header-text").css("color", "grey")
    //headerem.style.color = "rgb(9, 170, 245)"
    headerem.classList.add("tm-color-blue")
}
//Drag n drop zone
document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone")

    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click()
    })

    /*inputElement.addEventListener("change", (e) => {
            if (inputElement.files.length) {
                updateThumbnail(dropZoneElement, inputElement.files[0])
            }
        })*/

    dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault()
        dropZoneElement.classList.add("drop-zone--over")
    });

    ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over")
        })
    })

    dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault()

        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files
            draggedFile = e.dataTransfer.files[0]
            customAudio.src = URL.createObjectURL(draggedFile)
            activeTrack = e.dataTransfer.files[0].name.substring(0, e.dataTransfer.files[0].name.lastIndexOf("."))

            showTrackNameOnPlayer()
            customAudio.play()
            initVisualiser()
        }
        dropZoneElement.classList.remove("drop-zone--over")
    })
})
function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb")

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove()
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div")
        thumbnailElement.classList.add("drop-zone__thumb")
        dropZoneElement.appendChild(thumbnailElement)
    }

    thumbnailElement.dataset.label = file.name

    if (file.type.startsWith("img/gallery/")) {
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`
        }
    } else {
        thumbnailElement.style.backgroundImage = null
    }
}
function fadeOutGallery() {
    setTimeout(function () {
        $("#gallery").fadeOut('slow')
    }, 5000)
}
function fadeInGallery() {
    $("#gallery").fadeIn(200)
}
//Player
customAudio.addEventListener(
    "loadeddata",
    () => {
        audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
            customAudio.duration
        )
        customAudio.volume = initialAudioVol
        playBtn.classList.add("play")
    },
    false
)
timeline.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timeline).width
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * customAudio.duration
    customAudio.currentTime = timeToSeek
}, false)
volumeSlider.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width
    const newVolume = e.offsetX / parseInt(sliderWidth)
    //console.log("customAudio.volume:" + customAudio.volume + "costumAudio.volume:" + customAudio.volume + "\nnewVolume:" + newVolume )
    customAudio.volume = initialAudioVol = newVolume
    audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%'
}, false)
setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress")
    progressBar.style.width = customAudio.currentTime / customAudio.duration * 100 + "%"
    audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
        customAudio.currentTime
    )
}, timelineUpdateSpeed)
playBtn.addEventListener(
    "click",
    () => {
        if (customAudio.paused) {
            playBtn.classList.add("play")
            //analyser.smoothingTimeConstant = 0.8
            customAudio.play()
            $("#introImage").attr("src", "img/intro.gif")
        } else {
            playBtn.classList.remove("play")
            //analyser.smoothingTimeConstant = 0.95
            customAudio.pause()
            $("#introImage").attr("src", "img/intro.jpg")
        }
    },
    false
)
//Update vol status
audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
    const volumeEl = audioPlayer.querySelector(".volume-container .volume")
    customAudio.muted = !customAudio.muted
    if (customAudio.muted) {
        volumeEl.classList.remove("icono-volumeMedium")
        volumeEl.classList.add("icono-volumeMute")
    } else {
        volumeEl.classList.add("icono-volumeMedium")
        volumeEl.classList.remove("icono-volumeMute")
    }
})
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num)
    let minutes = parseInt(seconds / 60)
    seconds -= minutes * 60
    const hours = parseInt(minutes / 60)
    minutes -= hours * 60

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`

}
repeatBtn.addEventListener("click", () => {
    if (customAudio.loop) {
        customAudio.loop = false
        repeatBtn.classList.remove("repeat")
    }
    else {
        customAudio.loop = true
        repeatBtn.classList.add("repeat")
    }
})
galleryBtn.addEventListener("click", () => {
    $("#inline-gallery").click()
})
apiBtn.addEventListener("click", () => {
    $("#inline-api").click()
})
var initialStyle = false
styleBtn.addEventListener("click", () => {
    if (!initialStyle) {
        analyser.fftSize = 16384
        initialStyle = true
    } else {
        analyser.fftSize = 2048
        initialStyle = false
    }
    /*lastChangeInterval = changeInterval
    changeInterval = 0
    setInterval(() => {
        changeInterval++
    }, 1000)

    if (lastChangeInterval <= 5) {
        alert("Visual changes are available after every 5s")
    } else {
        cancelAnimationFrame(this)
        switch (styleIndex) {
            case 0: requestAnimationFrame(renOsici); break;
            case 1: requestAnimationFrame(renClassic); break;
            case 2: requestAnimationFrame(renCave); styleIndex = -1; break;
            default: console.log("Erorr in Style switch."); break;
        }
        styleIndex++
    }*/
})
focusBtn.addEventListener("click", () => {
    //Dimm background
    if (!canvasFocused) {
        $("#focus").css("opacity", "1")
        //tm-video-container and canvas have z-index > of 'blanket' (change opacity manually)
        $("#tm-video-container").css("background-color", "rgba(0, 14, 41, 0)")
        $("#canvas").css("background-color", "rgba(0, 14, 41, 0)")
        focusBtn.classList.add("focus")

        /*document.getElementById("drag\&drop").style.borderBottom = "hidden"
        document.getElementById("drag\&drop").style.borderTop = "hidden"*/
        let id = null
        const elem1 = document.getElementById("canvas");
        const elem2 = document.getElementById("tm-video-container")
        const elem3 = document.getElementById("drag&drop")
        const elem4 = document.getElementById("player")


        let pos = 0
        clearInterval(id)
        id = setInterval(frame, 4)
        function frame() {
            if (pos == 100) {
                clearInterval(id)
                $(galleryBtn).fadeIn("slow")
                $(apiBtn).fadeIn("slow")
            } else {
                pos++

                elem1.style.top = pos  + "px"

                if (pos == 95)
                    elem3.style.height = "500px"

                elem4.style.top = -pos + "px"
            }
        }
        console.log($(window).height())
        //var tmp = $(window).height() - 250
        //$(".tm-container").css("top", -tmp + "px")
        $(".tm-container").css("visibility", "hidden")
        canvasFocused = true
    }
    else {
        $("#focus").css("opacity", "0.0")
        $("#tm-video-container").css("background-color", "rgba(0, 14, 41, 0)")
        $("#canvas").css("background-color", "rgba(0, 14, 41, 0)")
        focusBtn.classList.remove("focus")

        let id = null;
        const elem1 = document.getElementById("canvas")
        const elem2 = document.getElementById("tm-video-container")
        const elem3 = document.getElementById("drag&drop")
        const elem4 = document.getElementById("player")

        let pos = 100;
        clearInterval(id);
        id = setInterval(frame, 5)
        function frame() {
            if (pos == 0) {
                clearInterval(id)
                $(galleryBtn).fadeOut("slow")
                $(apiBtn).fadeOut("slow")
                showInlinesOnFocusLost()
                $(".tm-container").css("visibility", "visible")
            } else {
                pos--;
                elem1.style.top = pos + "px"
                //elem4.style.bottom = pos + "px"
                if (pos == 5) {
                    elem3.style.height = "300px"
                }
                elem4.style.top = -pos * 0.8 + "px"
            }
        }
        galleryBtn.style.display = "none"
        apiBtn.style.display = "none"
        canvasFocused = false
    }
})
customAudio.onended = function () {
    playBtn.classList.remove("play")
    headerem.classList.remove("tm-color-blue")
    $("#introImage").attr("src", "img/intro.jpg")
    document.getElementById("drag\&drop").style.border = "1px dashed rgba(2, 154, 192, 1)"
    document.getElementById("dragndropbox").innerHTML = "Drag & drop or click to upload, or play from \nGallery & API"
}
customAudio.onplay = function () {
    document.getElementById("drag\&drop").style.border = "1px dashed rgba(2, 154, 192, 0)"
    document.getElementById("dragndropbox").innerHTML = ""
    showHeaderGlowOnAudioPlay()
    $("#introImage").attr("src", "img/intro.gif")
}
customAudio.onpause = function () {
    document.getElementById("drag\&drop").style.border = "1px dashed rgba(2, 154, 192, 1)"
    //$("#player").removeClass("inactive")
    headerem.classList.remove("tm-color-blue")
    $("#introImage").attr("src", "img/intro.jpg")
}
//API initial playlist
function apiInitialPlaylist() {
    iArray = []
    iIndex = 0
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://deezerdevs-deezer.p.rapidapi.com/playlist/9088452702",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "208e52f543msh5e5d6468e715adfp181e01jsn2f4692816998",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    }

    $.ajax(settings).done(function (response) {
        iArray = response
        appendInitialTracks(iArray)
    })

    function appendInitialTracks(array) {
        for (let i = 0; i < array.nb_tracks; i++) {
            $('main').append(`
                            <figure id=${i} class="effect-chico tm-gallery-item api">
                                <img    src="${array.tracks.data[i].album.cover_big}" alt="" style="z-index: -1">
                                    <p style="
                                    text-align: center;
                                    height: 7em;
                                    color: white;
                                    margin-top: -7em;                
                                    z-index: 1;">    
                                            ${array.tracks.data[i].title}
                                            ${array.tracks.data[i].artist.name}   
                                    <br> 
                                    <a href="${array.tracks.data[i].link}" target="_blank" class="link">Direct Link</a>
                                    </p>                  
                            </figure>
                        `)
            $('.link').on('click', function (event) {
                event.stopPropagation()
            })
        }
        apiInitialListFlag = true
    }
}
//Api search implementation
apiSearchBox.addEventListener("keyup", function (event) {
    if (event.key === 'Enter' && apiSearchBox.value != "") {
        event.preventDefault()
        prependTracks()

        const searchSettings = {
            "async": true,
            "crossDomain": true,
            "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + apiSearchBox.value,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "208e52f543msh5e5d6468e715adfp181e01jsn2f4692816998",
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
            }
        }

        $.ajax(searchSettings).done(function (response) {
            apiQueArray = response
            appendQuerryTracks(apiQueArray)
        })

        function appendQuerryTracks(array) {
            for (let i = 0; i < array.total; i++) {
                $('main').append(`
                        <figure id=${i} class="effect-chico tm-gallery-item api">
                            <img    src="${array.data[i].artist.picture_big}" alt="" style="z-index: -1">
                            <p style="
                            text-align: center;
                            height: 7em;
                            color: white;
                            margin-top: -7em;                
                            z-index: 1;">
                                     ${array.data[i].title}
                                      ${array.data[i].artist.name}    
                                <a href="${array.data[i].link}" target="_blank" class="link";">Direct Link</a>                      
                                </p>
                        </figure>
                    `)
                $('.link').on('click', function (event) {
                    event.stopPropagation()
                })
            }
        }
        apiInitialListFlag = false
    } else if (event.key === 'Enter' && apiSearchBox.value == "") {
        prependTracks()
        apiInitialPlaylist()
    }

    function prependTracks() {
        $('.api').remove()
    }
})
$('main').on('click', 'figure', function () {
    if (apiInitialListFlag) {
        iIndex = $(this).attr("id")
        customAudio.src = iArray.tracks.data[iIndex].preview
        activeTrack = iArray.tracks.data[iIndex].title + " - " + iArray.tracks.data[iIndex].artist.name
    } else {
        apiQueIndex = $(this).attr("id")
        customAudio.src = apiQueArray.data[apiQueIndex].preview
        activeTrack = apiQueArray.data[apiQueIndex].title + " - " + apiQueArray.data[apiQueIndex].artist.name
    }
    showTrackNameOnPlayer()
    customAudio.play()
    initVisualiser()
})
//Dinamyc Gallery
for (let i = 0; i < numberOfTracks; i++) {

    figure[i] = document.createElement("figure")
    figure[i].id = "fig" + i.toString()
    figure[i].classList.add("effect-chico", "tm-gallery-item", dynAudioData["style"][i])

    image[i] = document.createElement("img")
    image[i].id = "track" + i.toString()
    image[i].src = dynAudioData["image"][i]
    image[i].alt = dynPathPrefix + dynAudioData["audio"][i]

    figurecap[i] = document.createElement("figcaption")
    figurecap[i].id = "figcap" + i.toString()

    paragraph[i] = document.createElement("p")
    paragraph[i].style.fontSize = "17px"
    var paragraphText = document.createTextNode(dynAudioData["audio"][i].toString().substring(0, dynAudioData["audio"][i].lastIndexOf(".")))
    paragraph[i].append(paragraphText)

    figurecap[i].append(paragraph[i])
    figure[i].append(image[i])
    figure[i].append(figurecap[i])

    //Append element to gallery
    document.getElementById("gallery-container").append(figure[i])

    activeListener[i] = false

    //Listeners
    document.getElementById("figcap".concat(i.toString())).addEventListener("click", function () {
        const activeTrackFlag = activeListener.reduce(
            (out, bool, index) => bool ? out.concat(index) : out,
            []
        )

        if (activeTrackFlag[0] == i) {
            if (customAudio.paused) {
                customAudio.play()
                image[i].src = galleryPlayGif;
            }
            else {
                customAudio.pause()
                //Insted of reverting image, stop gif on current frame
            }
        }
        else {
            for (let k = 0; k < numberOfTracks; k++) {
                if (activeListener[k] === true && k != i) {
                    image[k].src = dynAudioData["image"][k];
                    activeListener[k] = false;
                    flagPrev = k;
                }
            }
            for (let l = 0; l < numberOfTracks; l++) {
                if (l != i)
                    activeListener[l] = false;
                else if (l == i) {
                    //fullImagePath = document.getElementById(trackId[i]).src.toString()
                    //originalSrc = fullImagePath.substring(fullImagePath.lastIndexOf("/") + 1, fullImagePath.length)
                    //document.getElementById(trackId[i].toString()).src = playingGIF;
                    //var trackName = document.getElementById(trackId[i].toString()).alt
                    //activeTrack = trackName.substring(trackName.lastIndexOf("/") + 1, trackName.lastIndexOf("."))
                    activeTrack = dynAudioData["audio"][i].substring(0, dynAudioData["audio"][i].lastIndexOf("."))
                    activeListener[i] = true
                    flagCurr = i;
                    showTrackNameOnPlayer()
                    image[i].src = galleryPlayGif;
                }
            }
            playLocalTrack(dynPathPrefix + dynAudioData["audio"][i])
        }
    })
}
//API initial
apiInitialPlaylist()
//Copy to clipboard -> HIGH SECURITY RISK!
/*
function updateClipboard() {
    if (document.getElementById("playerTrackDiv").innerHTML != "Clipboard") {
        navigator.clipboard.writeText(activeTrack).then(function () {
            var clip = document.getElementById("playerTrackDiv")
            var tempTrackName = clip.innerHTML

            clip.innerHTML = "Copy Successful ✓"
            $(clip).fadeOut('slow')
            $(clip).fadeIn('slow')
            setTimeout(function () {
                $(clip).fadeIn('slow')
                clip.innerHTML = tempTrackName
            }, 2000)
        }, function () {
            alert("Copy to clipoard failed.")
        })
    }
}*/
//Inline animations
function showInlinesInitial() {
    const duration = 3000
    const delay = 1000

    inlineIntro.animate([
        { transform: 'translateX(-400px)' }, { transform: 'translateX(-300px)' }, { transform: 'translateX(-200px)' },
        { transform: 'translateX(-100px)' }, { transform: 'translateX(-50px)' }, { transform: 'translateX(0px)' }
    ],
        {
            easing: 'cubic-bezier(0.1, 0, 0.1, 1)',
            duration: duration,
            iterations: 1
        })
    inlineGallery.animate([
        { transform: 'translateX(-800px)' }, { transform: 'translateX(0px)' }
    ],
        {
            easing: 'cubic-bezier(0.1, 0, 0.1, 1)',
            duration: duration,
            iterations: 1
        })
    inlineApi.animate([
        { transform: 'translateX(-1200px)' }, { transform: 'translateX(0px)' }
    ],
        {
            easing: 'cubic-bezier(0.1, 0, 0.1, 1)',
            duration: duration,
            iterations: 1
        })
    inlineAbout.animate([
        { transform: 'translateX(-1600px)' }, { transform: 'translateX(0px)' }
    ],
        {
            easing: 'cubic-bezier(0.1, 0, 0.1, 1)',
            duration: duration,
            iterations: 1
        })
    inlineContact.animate([
        { transform: 'translateX(-2000px)' }, { transform: 'translateX(0px)' }
    ],
        {
            easing: 'cubic-bezier(0.1, 0, 0.1, 1)',
            duration: duration,
            iterations: 1
        })
    //inlineContact.addEventListener("animationend", showHeaderText())
    Promise.all(
        inlineContact.getAnimations().map(
            function (animation) {
                return animation.finished
            }
        )
    ).then(
        function () {
            $("#headerem").css("visibility", "visible")
            showHeaderText()
            $(".tm-nav-link").css("border-color", "#0b88b93d")
            //typeContract()
        }
    )
}
function showInlinesOnFocusLost() {
    const duration = 3000
    const delay = 1000

    inlineIntro.animate([
        { transform: 'translateY(400px)' }, { transform: 'translateY(0px)' }
    ],
        {
            easing: 'cubic-bezier(0.1, 0, 0.1, 1)',
            duration: duration,
            iterations: 1
        })
    inlineGallery.animate([
        { transform: 'translateY(400px)' }, { transform: 'translateY(0px)' }
    ],
        {
            easing: 'cubic-bezier(0.1, 0, 0.1, 1)',
            duration: duration,
            iterations: 1
        })
    inlineApi.animate([
        { transform: 'translateY(400px)' }, { transform: 'translateY(0px)' }
    ],
        {
            easing: 'cubic-bezier(0.1, 0, 0.1, 1)',
            duration: duration,
            iterations: 1
        })
    inlineAbout.animate([
        { transform: 'translateY(400px)' }, { transform: 'translateY(0px)' }
    ],
        {
            easing: 'cubic-bezier(0.1, 0, 0.1, 1)',
            duration: duration,
            iterations: 1
        })
    inlineContact.animate([
        { transform: 'translateY(400px)' }, { transform: 'translateX(0px)' }
    ],
        {
            easing: 'cubic-bezier(0.1, 0, 0.1, 1)',
            duration: duration,
            iterations: 1
        })

    Promise.all(
        inlineContact.getAnimations().map(
            function (animation) {
                return animation.finished
            }
        )
    ).then(
        function () {
            //document.getElementById("drag\&drop").style.border = "1px dashed rgba(2, 154, 192, 0.25)"
        }
    )
}
function fadoutInlinesToRight() {
    const duration = 3000
    const delay = 1000

    inlineIntro.animate([
        { transform: 'translateX(0px)' }, { transform: 'translateX(100px)' }, { transform: 'translateX(200px)' },
        { transform: 'translateX(250px)' }, { transform: 'translateX(300px)' }, { transform: 'translateX(400px)' }
    ],
        {
            easing: 'cubic-bezier(0.1, 0, 0.1, 1)',
            duration: duration,
            iterations: 1
        })
    inlineGallery.animate([
        { transform: 'translateX(-800px)' }, { transform: 'translateX(0px)' }
    ],
        {
            easing: 'cubic-bezier(0.1, 0, 0.1, 1)',
            duration: duration,
            iterations: 1
        })
    inlineApi.animate([
        { transform: 'translateX(-1200px)' }, { transform: 'translateX(0px)' }
    ],
        {
            easing: 'cubic-bezier(0.1, 0, 0.1, 1)',
            duration: duration,
            iterations: 1
        })
    inlineAbout.animate([
        { transform: 'translateX(-1600px)' }, { transform: 'translateX(0px)' }
    ],
        {
            easing: 'cubic-bezier(0.1, 0, 0.1, 1)',
            duration: duration,
            iterations: 1
        })
    inlineContact.animate([
        { transform: 'translateX(-2000px)' }, { transform: 'translateX(0px)' }
    ],
        {
            easing: 'cubic-bezier(0.1, 0, 0.1, 1)',
            duration: duration,
            iterations: 1
        })
    //inlineContact.addEventListener("animationend", showHeaderText())
    Promise.all(
        inlineIntro.getAnimations().map(
            function (animation) {
                return animation.finished
            }
        )
    ).then(
        function () {

        }
    )
}
function typeContract() {

    var innerContact = document.getElementById("inline-contact")
    var innerHtml = document.getElementById("inline-contact").innerHTML

    var innerIcon = document.createElement("i")
    innerIcon.classList.add("far", "fa-3x", "fa-comments") //Contact Contract

    document.getElementById("inline-contact").innerHTML = ""
    new TypeIt("#inline-contact", {
        speed: 90,
        cursor: false,
        afterComplete: function (step, instance) {
            instance.destroy()
            innerIcon.style.opacity = "1"
            innerContact.append(innerIcon)
            innerIcon.animate(
                {
                    easing: 'steps(7, end)',
                    duration: 600
                })
            setTimeout(() => {

            }, 1500)
        }
    })
        .type("Contract")
        .pause(2000)
        .delete(4)
        .type("act")
        .go()
}