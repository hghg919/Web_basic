document.addEventListener('DOMContentLoaded', () => {
    const backgroundSlider = document.querySelector('.background-slider');

    // 사용할 배경 이미지 배열
    const images = [
        'images/김해.jpg',
        'images/창원.png',
        'images/통영.jpg',
        'images/거제.png'
    ];

    let currentIndex = 0;

    // 배경 이미지를 변경하는 함수
    function changeBackgroundImage() {
        backgroundSlider.style.backgroundImage = `url('${images[currentIndex]}')`;
        currentIndex = (currentIndex + 1) % images.length; // 다음 이미지 인덱스로 이동, 마지막 이미지면 다시 처음으로
    }

    // 초기 이미지 설정
    changeBackgroundImage();

    // 3초(3000ms)마다 이미지 변경
    setInterval(changeBackgroundImage, 3000);
});

/* ========================================= */
/* --- 2. 상세 페이지 (detail.html) 기능 --- */
/* ========================================= */

// 썸네일 클릭 시 메인 이미지 변경 기능
// 이 코드는 detail.html 페이지에서만 작동합니다.

// 현재 페이지가 detail.html일 때만 이 스크립트를 실행
if (document.querySelector('.detail-gallery')) {
    
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail-list .thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // 1. 클릭한 썸네일의 이미지 주소(src)를 가져옴
            const newImageSrc = this.src;
            
            // 2. 메인 이미지의 주소를 클릭한 썸네일 주소로 변경
            mainImage.src = newImageSrc;
            mainImage.alt = this.alt; // alt 텍스트도 변경

            // 3. 'active' 클래스 관리 (현재 활성화된 썸네일 표시)
            // 모든 썸네일에서 'active' 클래스 제거
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // 클릭한 썸네일에만 'active' 클래스 추가
            this.classList.add('active');
        });
    });
}