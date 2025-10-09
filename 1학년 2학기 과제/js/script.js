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