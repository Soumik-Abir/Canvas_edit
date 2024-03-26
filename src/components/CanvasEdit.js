import DesignPattern from "../assets/Design_Pattern.png";
import Mask from "../assets/mask.png";
import MaskStroke from "../assets/Mask_stroke.png";
import { data as templateData } from "../assets/data.js";

class CanvasEdit {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  drawBackground(backgroundColor) {
    this.ctx.fillStyle = backgroundColor; // Set the provided background color
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawImagesAndTexts({ logoImage, maskImage, captionText, ctaText }) {
    this.drawImage(DesignPattern, 0, 0, 1080, 1080);
    this.drawImage(logoImage, 840, 40, 140, 120);
    this.drawImage(Mask, 0, 0, 1080, 1080);
    this.drawImage(MaskStroke, 0, 0, 1080, 1080);

    this.drawText(captionText, templateData.caption);
    this.drawCTA(templateData.cta, ctaText);

    this.drawImage(maskImage, 56, 442, 970, 600);
  }

  drawText(
    text,
    { position, max_characters_per_line, font_size, alignment, text_color }
  ) {
    this.ctx.save();

    // Set text styles
    this.ctx.fillStyle = text_color || "#FFFFFF";
    this.ctx.strokeStyle = text_color || "#FFFFFF";
    this.ctx.font = `${font_size}px Arial`;

    // Split text into words
    const words = text.split(" ");

    // Initialize variables
    let line = "";
    let lines = [];

    // Iterate through words to create lines that fit within the specified max characters per line
    for (let word of words) {
      // Append current word to the line
      const testLine = line + word + " ";
      // Measure width of current line
      const metrics = this.ctx.measureText(testLine);
      const testWidth = metrics.width;

      // If current line exceeds max characters per line, push current line to lines array and start a new line
      if (
        testWidth > max_characters_per_line * (font_size / 2) &&
        line.length > 0
      ) {
        lines.push(line);
        line = word + " ";
      } else {
        // Otherwise, continue appending words to current line
        line = testLine;
      }
    }

    // Push the last line to lines array
    lines.push(line);

    // Set initial y position for drawing text
    let y = position.y;

    // Draw each line of text
    for (let line of lines) {
      // Set text alignment
      this.ctx.textAlign = alignment || "left";
      // Draw text on canvas
      this.ctx.fillText(line, position.x + 30, y + 75);
      // Increment y position for next line
      y += font_size + 8;
    }

    this.ctx.restore();
  }

  drawCTA(cta, ctaText) {
    const {
      position,
      font_size = 30,
      text_color,
      background_color,
      wrap_length = 20,
    } = cta;

    const x = position.x;
    const y = position.y;
    const padding = 24;

    this.ctx.save();
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    // Measure text width and height
    const textMetrics = this.ctx.measureText(ctaText);
    const textWidth = textMetrics.width;
    const textHeight = font_size;

    // Calculate width and height of the CTA button
    const rectWidth = textWidth + 8 * wrap_length + padding;
    const rectHeight = textHeight + 2 * wrap_length + padding;

    // Draw the CTA button
    this.ctx.fillStyle = background_color || "#000";
    this.ctx.strokeStyle = text_color || "#FFF";
    this.ctx.beginPath();
    this.roundedRect(
      this.ctx,
      x - rectWidth / 2,
      y - rectHeight / 2,
      rectWidth,
      rectHeight,
      wrap_length
    ); // Utilize wrap_length for rounded rectangle
    this.ctx.fill();
    this.ctx.stroke();

    // Draw the CTA text
    this.ctx.fillStyle = text_color || "#FFF";
    this.ctx.font = `${font_size}px Arial`;
    this.ctx.fillText(ctaText, x, y);
    this.ctx.strokeText(ctaText, x, y);

    this.ctx.restore();
  }

  roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width , y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  drawImage(imageSrc, x, y, width, height) {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      this.ctx.save();

      this.ctx.drawImage(img, x, y, width, height);
      console.log("Image drawn successfully");

      this.ctx.restore();
    };

    img.onerror = (error) => {
      console.error("Error loading image:", error);
    };
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default CanvasEdit;
