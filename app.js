// Temel Sahne Ayarları
const scene = new THREE.Scene();  // Sahne oluşturuyoruz

// Perspektif kamera oluşturma
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// WebGLRenderer ile render işlemi başlatma
const renderer = new THREE.WebGLRenderer();  // WebGL render motoru
renderer.setSize(window.innerWidth, window.innerHeight);  // Ekran boyutuna göre renderer ayarları
document.body.appendChild(renderer.domElement);  // Canvas'ı body'ye ekliyoruz

// Bir küp (box) geometrisi ekleyelim
const geometry = new THREE.BoxGeometry(1, 1, 1);  // Küp geometrisi
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });  // Yeşil renk
const cube = new THREE.Mesh(geometry, material);  // Küp mesh oluşturuluyor
scene.add(cube);  // Küpü sahneye ekliyoruz

// Kamerayı sahneye yerleştirme
camera.position.z = 5;

// Animasyon fonksiyonu
function animate() {
    requestAnimationFrame(animate);  // Her frame'de animate fonksiyonunu tekrar çağırıyoruz

    cube.rotation.x += 0.01;  // Küpü yatayda döndürüyoruz
    cube.rotation.y += 0.01;  // Küpü dikeyde döndürüyoruz

    renderer.render(scene, camera);  // Sahneyi render ediyoruz
}

// Animasyonu başlatıyoruz
animate();

// Fare ile hareketleri takip etme
let mouseX = 0;
let mouseY = 0;

// Fare hareketlerini dinleyen bir event listener ekliyoruz
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1; // Fare X koordinatını -1 ile 1 arasında normalize et
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1; // Fare Y koordinatını -1 ile 1 arasında normalize et
});

// Animasyon fonksiyonunda kamerayı fareye göre hareket ettiriyoruz
function animate() {
    requestAnimationFrame(animate);

    // Kamerayı fare ile orantılı hareket ettiriyoruz
    camera.position.x += (mouseX - camera.position.x) * 0.05; 
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position); // Kamera sahneye bakmaya devam eder

    renderer.render(scene, camera); // Sahneyi render et
}

animate();

// Hareketli top oluşturma
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // Küresel şekil (top)
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Kırmızı renk
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial); // Top mesh
sphere.position.x = -3; // Başlangıç konumu
scene.add(sphere); // Sahneye ekliyoruz

let sphereDirection = 0.05; // Topun hareket hızı

// Animasyon fonksiyonunda topu hareket ettiriyoruz
function animate() {
    requestAnimationFrame(animate);

    // Küpü döndürme
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Topu sağa sola hareket ettiriyoruz
    sphere.position.x += sphereDirection;

    // Topun kenarlara çarpmasını engelliyoruz
    if (sphere.position.x > 5 || sphere.position.x < -5) {
        sphereDirection = -sphereDirection; // Yön değiştiriyoruz
    }

    renderer.render(scene, camera); // Sahneyi render et
}

animate();
