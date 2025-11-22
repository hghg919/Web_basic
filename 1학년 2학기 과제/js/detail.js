/* ========================================= */
/* --- 3. detail.js (Dynamic Engine) --- */
/* ========================================= */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. URL에서 ID 값 가져오기 ---
    const urlParams = new URLSearchParams(window.location.search);
    const placeId = urlParams.get('id');

    if (!placeId || !touristData[placeId]) {
        console.error("Place ID를 찾을 수 없거나 데이터가 없습니다.");
        document.body.innerHTML = "<h1>데이터를 찾을 수 없습니다. <a href='index.html'>메인으로 돌아가기</a></h1>";
        return;
    }

    // --- 2. data.js에서 데이터 가져오기 ---
    const data = touristData[placeId];

    // --- 3. HTML 템플릿에 데이터 채우기 ---
    
    // 1) 브라우저 탭 제목
    document.title = `경남 4색 여행 - ${data.name}`;

    // 2) 섹션 1: 갤러리
    document.getElementById('detail-name').textContent = data.name;
    document.getElementById('mainImage').src = data.mainImage;
    document.getElementById('mainImage').alt = `${data.name} 메인 이미지`;

    const thumbnailList = document.getElementById('thumbnail-list');
    thumbnailList.innerHTML = ''; 
    
    data.thumbnails.forEach((thumbSrc, index) => {
        const img = document.createElement('img');
        img.src = thumbSrc;
        img.alt = `${data.name} 썸네일 ${index + 1}`;
        img.className = 'thumbnail';
        if (index === 0) {
            img.classList.add('active'); 
        }
        thumbnailList.appendChild(img);
    });

    // 3) 섹션 2: 정보
    document.getElementById('info-address').textContent = data.info.address;
    document.getElementById('info-phone').textContent = data.info.phone;
    document.getElementById('info-facility').textContent = data.info.facility;
    document.getElementById('info-homepage').href = data.info.homepage;
    
    // 길찾기 버튼 링크 설정
    const mapBtn = document.getElementById('btn-map');
    mapBtn.href = `https://map.kakao.com/link/search/${data.info.address}`;

    // 상세 내용 텍스트 채우기
    const detailTextContent = document.getElementById('detail-text-content');
    detailTextContent.innerHTML = ''; 
    
    data.details.forEach(paragraphText => {
        const p = document.createElement('p');
        p.textContent = paragraphText;
        detailTextContent.appendChild(p);
    });

    // 4) 섹션 3: 지도 (iframe)
    document.getElementById('map-iframe').src = data.mapSrc;


    // --- 4. 갤러리 클릭 이벤트 ---
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail-list .thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const newImageSrc = this.src;
                mainImage.src = newImageSrc;
                mainImage.alt = this.alt;
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // =================================================
    //  [추가 기능 구현]
    // =================================================

    // --- 기능 1: 좋아요 하트 (LocalStorage 활용) ---
    const likeBtn = document.getElementById('btn-like');
    const storageKey = 'liked_' + placeId; // 예: liked_changwon

    // 1) 저장된 상태 불러오기
    const isLiked = localStorage.getItem(storageKey);
    if (isLiked === 'true') {
        likeBtn.textContent = '♥'; // 꽉 찬 하트
        likeBtn.classList.add('liked');
    } else {
        likeBtn.textContent = '♡'; // 빈 하트
        likeBtn.classList.remove('liked');
    }

    // 2) 클릭 이벤트
    likeBtn.addEventListener('click', function() {
        // 클래스 토글
        this.classList.toggle('liked');

        if (this.classList.contains('liked')) {
            this.textContent = '♥';
            localStorage.setItem(storageKey, 'true'); // 저장
        } else {
            this.textContent = '♡';
            localStorage.setItem(storageKey, 'false'); // 저장 해제
        }
    });


    // --- 기능 2: 라이트박스 (이미지 확대) ---
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeSpan = document.querySelector('.close-lightbox');
    
    // 메인 이미지 클릭 시 열기
    mainImage.addEventListener('click', function() {
        // lightbox.style.display = "block";  // 👈 이 줄을 지우거나 주석 처리하고
        lightbox.style.display = "flex";      // 👈 🔥 이 줄을 추가하세요! (flex로 변경)
        lightboxImg.src = this.src;
    });

    // 닫기 버튼(x) 클릭 시 닫기
    closeSpan.addEventListener('click', function() {
        lightbox.style.display = "none";
    });

    // 모달 바깥 배경 클릭 시 닫기
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });


    // --- 기능 3: 맨 위로 가기 버튼 ---
    const topBtn = document.getElementById('btn-top');

    // 스크롤 감지
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    });

    // 버튼 클릭 시 이동
    topBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // --- 기능 4: 우측 네비게이션 스크롤 스파이 (현재 위치 표시) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.side-nav a');

    // IntersectionObserver: 요소가 화면에 보이는지 감시하는 API
    const observerOptions = {
        threshold: 0.5 // 50% 이상 보일 때 감지
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 현재 보이는 섹션의 id 가져오기
                const id = entry.target.getAttribute('id');
                
                // 모든 링크에서 active 제거
                navLinks.forEach(link => link.classList.remove('active'));

                // 해당 id를 가진 링크에 active 추가
                const activeLink = document.querySelector(`.side-nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if(section.id) observer.observe(section);
    });

});