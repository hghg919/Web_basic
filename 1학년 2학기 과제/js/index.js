/* ========================================= */
/* --- 1. index.js (첫 페이지만 적용) --- */
/* ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // .background-slider가 있는 페이지에서만 실행 (메인 페이지)
    const backgroundSlider = document.querySelector('.background-slider');

    // .background-slider가 없으면 함수를 즉시 종료
    if (!backgroundSlider) {
        return;
    }

    // 사용할 배경 이미지 배열
    const images = [
        'images/김해.png',
        'images/창원.png',
        'images/통영.png',
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