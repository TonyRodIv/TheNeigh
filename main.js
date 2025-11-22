 // --- DADOS COM IMAGENS LOCAIS DA BANDA ---
        const musicData = [
            {
                title: "Reflections",
                album: "Hard To Imagine...",
                src: "./src/10 The Neighbourhood - Reflections.mp3",
                cover: "./img/HTITNEC-capa.png"
            },
            {
                title: "Daddy Issues (Remix)",
                album: "Wiped Out!",
                src: "./src/The Neighbourhood - Daddy Issues (Remix).mp3",
                cover: "./img/daddyIssues (1).png"
            },
            {
                title: "Softcore",
                album: "Hard To Imagine...",
                src: "./src/05 The Neighbourhood - Softcore.mp3",
                cover: "./img/HTITNEC-capa.png"
            },
            {
                title: "You Get Me So High",
                album: "Hard To Imagine...",
                src: "./src/09 The Neighbourhood - You Get Me So High.mp3",
                cover: "./img/HTITNEC-capa.png"
            }
        ];

        const videoData = [
            { title: "Sweater Weather", album: "I Love You.", img: "./img/sweaterWeather.png", link: "https://www.youtube.com/embed/GCdwKhTtNNw" },
            { title: "Daddy Issues", album: "Wiped Out!", img: "./img/daddyIssuesVideo.png", link: "https://www.youtube.com/embed/_lMlsPQJs6U" },
            { title: "Stargazing", album: "Chip Chrome", img: "./img/stargazingVideo.png", link: "https://www.youtube.com/embed/8giBPUpzKRw" },
            { title: "Pretty Boy", album: "Chip Chrome", img: "./img/prettyBoy.png", link: "https://www.youtube.com/embed/Jir-WItz1OI" }
        ];

        // --- ELEMENTOS DO DOM ---
        const audio = document.getElementById('audioPlayer');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const iconPlay = document.getElementById('iconPlay');
        const iconPause = document.getElementById('iconPause');
        const progressBar = document.getElementById('progressBar');
        const progressContainer = document.getElementById('progressContainer');
        const currTimeEl = document.getElementById('currTime');
        const durTimeEl = document.getElementById('durTime');
        const playerBar = document.getElementById('playerBar');
        const pTitle = document.getElementById('p-title');
        const pAlbum = document.getElementById('p-album');
        const pCover = document.getElementById('p-cover');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const volSlider = document.getElementById('volSlider');

        let currentSongIndex = 0;
        let isPlaying = false;

        // --- INICIALIZAÇÃO ---
        function init() {
            renderMusicList();
            renderVideoList();
            
            window.addEventListener('scroll', () => {
                const nav = document.getElementById('navbar');
                if(window.scrollY > 50) nav.classList.add('scrolled');
                else nav.classList.remove('scrolled');
            });
        }

        // --- RENDERIZAÇÃO ---
        function renderMusicList() {
            const container = document.querySelector('.section .media-scroller');
            container.innerHTML = musicData.map((song, index) => `
                <div class="media-card music-card-horizontal" onclick="loadAndPlay(${index})">
                    <div style="position: relative; min-width: 100px;">
                        <img src="${song.cover}" alt="${song.title}">
                        <div class="play-overlay">
                             <div class="play-icon-circle">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                             </div>
                        </div>
                    </div>
                    <div class="card-info">
                        <div class="card-title">${song.title}</div>
                        <div class="card-album">${song.album}</div>
                    </div>
                </div>
            `).join('');
        }

        function renderVideoList() {
            const container = document.getElementById('video-scroller');
            container.innerHTML = videoData.map((video) => `
                <div class="media-card" onclick="openVideo('${video.link}', '${video.title}')" style="grid-auto-columns: 400px;">
                    <div style="position:relative; height: 220px;">
                        <img src="${video.img}" class="card-image" alt="${video.title}">
                        <div class="play-overlay">
                             <div class="play-icon-circle">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>
                             </div>
                        </div>
                    </div>
                    <div style="padding: 20px;">
                        <div class="card-title">${video.title}</div>
                        <div class="card-album">${video.album}</div>
                    </div>
                </div>
            `).join('');
        }

        // --- PLAYER LOGIC ---
        function loadAndPlay(index) {
            currentSongIndex = index;
            const song = musicData[index];
            
            pTitle.innerText = song.title;
            pAlbum.innerText = song.album;
            pCover.src = song.cover;
            playerBar.classList.add('active');
            
            audio.src = song.src;
            playTrack();
        }

        function playTrack() {
            audio.play().catch(e => console.log("Interação necessária primeiro"));
            isPlaying = true;
            updatePlayBtn();
        }

        function pauseTrack() {
            audio.pause();
            isPlaying = false;
            updatePlayBtn();
        }

        function togglePlay() {
            if(audio.src) {
                isPlaying ? pauseTrack() : playTrack();
            }
        }

        function updatePlayBtn() {
            if(isPlaying) {
                iconPlay.style.display = 'none';
                iconPause.style.display = 'block';
            } else {
                iconPlay.style.display = 'block';
                iconPause.style.display = 'none';
            }
        }

        function prevTrack() {
            currentSongIndex--;
            if (currentSongIndex < 0) currentSongIndex = musicData.length - 1;
            loadAndPlay(currentSongIndex);
        }

        function nextTrack() {
            currentSongIndex++;
            if (currentSongIndex > musicData.length - 1) currentSongIndex = 0;
            loadAndPlay(currentSongIndex);
        }

        audio.addEventListener('timeupdate', (e) => {
            const { duration, currentTime } = e.srcElement;
            if(isNaN(duration)) return;
            
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            
            currTimeEl.innerText = formatTime(currentTime);
            durTimeEl.innerText = formatTime(duration);
        });

        progressContainer.addEventListener('click', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = audio.duration;
            audio.currentTime = (clickX / width) * duration;
        });

        audio.addEventListener('ended', nextTrack);

        function formatTime(time) {
            const min = Math.floor(time / 60);
            let sec = Math.floor(time % 60);
            if (sec < 10) sec = `0${sec}`;
            return `${min}:${sec}`;
        }

        volSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
        });

        playPauseBtn.addEventListener('click', togglePlay);
        prevBtn.addEventListener('click', prevTrack);
        nextBtn.addEventListener('click', nextTrack);

        // --- UI ACTIONS ---
        function toggleBio(e) {
            if(e) e.preventDefault();
            const bio = document.getElementById('biography');
            const btn = document.querySelector('.btn-toggle-text');
            bio.classList.toggle('expanded');
            btn.innerText = bio.classList.contains('expanded') ? 'Ler menos' : 'Ler biografia completa';
        }

        // --- VIDEO MODAL LOGIC ---
        const videoModal = document.getElementById('videoModal');
        const videoFrame = document.getElementById('videoFrame');
        const modalTitle = document.getElementById('modalTitle');

        function openVideo(link, title) {
            if(isPlaying) pauseTrack();
            
            videoFrame.src = link + "?autoplay=1"; 
            modalTitle.innerText = title;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeVideo() {
            videoModal.classList.remove('active');
            videoFrame.src = "";
            document.body.style.overflow = 'auto';
        }

        videoModal.addEventListener('click', (e) => {
            if(e.target === videoModal) closeVideo();
        });

        init();