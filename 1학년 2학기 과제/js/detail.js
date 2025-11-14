/* ========================================= */
/* --- 2. detail.js (상세 페이지만 적용) --- */
/* ========================================= */

// 썸네일 클릭 시 메인 이미지 변경 기능
document.addEventListener('DOMContentLoaded', () => {

    // 💡 .detail-gallery-fullscreen 요소가 있는 페이지에서만 이 코드가 실행됩니다.
    const gallery = document.querySelector('.detail-gallery-fullscreen');

    // 갤러리 요소가 없으면 (즉, detail.html이 아니면) 스크립트 실행 중단
    if (!gallery) {
        return;
    }

    // 갤러리 관련 요소들 찾기
    const mainImage = gallery.querySelector('#mainImage'); // 갤러리 내부에서 mainImage 검색
    const thumbnails = gallery.querySelectorAll('.thumbnail-list .thumbnail');

    // 썸네일이 하나도 없으면 중단
    if (!mainImage || thumbnails.length === 0) {
        return;
    }

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
});