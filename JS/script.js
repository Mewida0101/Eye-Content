// الحصول على الأجزاء والمنطقة المستهدفة
const parts = document.querySelectorAll('.part');
const dropzones = document.querySelectorAll('.dropzone');

// تحميل الأصوات
const correctSound = document.getElementById('correctSound');
const errorSound = document.getElementById('errorSound');

// إضافة خاصية السحب لكل جزء
parts.forEach(part => {
  part.setAttribute('draggable', 'true');
  part.addEventListener('dragstart', dragStart);
});

// معالجة بدء السحب
function dragStart(event) {
  event.dataTransfer.setData('text', event.target.getAttribute('data-part'));
  event.dataTransfer.setData('id', event.target.id); // تخزين معرف العنصر
}

// إضافة مستمعات الأحداث لمناطق الإسقاط
dropzones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('drop', dropPart);
});
// dropzones.forEach((zone, index) => {
//   zone.addEventListener('dragover', dragOver);
//   zone.addEventListener('drop', (event) => dropPart(event, index + 1));
// });
// معالجة السحب فوق منطقة الإسقاط
function dragOver(event) {
  event.preventDefault();
}

// معالجة الإسقاط
function dropPart(event) {
  event.preventDefault();
  const draggedPart = event.dataTransfer.getData('text');
  const draggedElementId = event.dataTransfer.getData('id'); // جلب معرف العنصر
  const targetPart = event.target.getAttribute('data-part');

  if (draggedPart === targetPart) {
    event.target.textContent = draggedPart;
    event.target.classList.add('correct');
    document.getElementById(draggedElementId).style.visibility = 'hidden'; // إخفاء العنصر المسحوب
    correctSound.play();

  }
  else {
    event.target.classList.add('incorrect');
    document.getElementById(draggedElementId).style.visibility = 'hidden'; // إخفاء العنصر المسحوب
    setTimeout(() => {
      event.target.classList.remove('incorrect');
      document.getElementById(draggedElementId).style.visibility = 'visible'; // إظهار العنصر المسحوب
    }, 1500);
    errorSound.play();
  }
}