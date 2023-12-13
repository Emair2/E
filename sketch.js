let video1; 
let image2; 
let capture; 
let showImage = false; 

function setup() {
  createCanvas(360, 640);

  video1 = createVideo(['E.mp4'], videoLoaded);
  video1.hide(); // 隐藏原始视频元素

  image2 = loadImage('video 2.png'); 

  // Webcam
  capture = createCapture(VIDEO);
  capture.size(360, 640);
  capture.hide(); 
}

function videoLoaded() {
  console.log("视频已加载完成");
  video1.loop();
}

function draw() {
  background(255);

  // 检测粉色
  capture.loadPixels();
  if (capture.pixels.length > 0) {
    let detected = detectPink(capture);
    showImage = detected; // 根据是否检测到粉色来设置 showImage 标志
  }

  // 根据 showImage 标志显示图片或视频
  if (showImage) {
    image(image2, 0, 0, width, height); 
  } else {
    image(video1, 0, 0, width, height); 
  }
}

function detectPink(capture) {
  for (let y = 0; y < capture.height; y++) {
    for (let x = 0; x < capture.width; x++) {
      let index = (x + y * capture.width) * 4;
      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];

      // check pink
      if (r > 150 && g < 100 && b > 150) {
        return true;
      }
    }
  }
  return false;
}
