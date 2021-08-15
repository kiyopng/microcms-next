import * as path from "path";
import { createCanvas, registerFont, loadImage } from 'canvas';
import fs from "fs";

const createTextLine = (canvas, text) => {
    const context = canvas.getContext("2d");
    const MAX_WIDTH = 1000;
    for (let i = 0; i < text.length; i += 1) {
        const line = text.substring(0, i + 1);
        if (context.measureText(line).width > MAX_WIDTH) {
        return {
            line,
            remaining: text.substring(i + 1),
        };
        }
    }
    return {
        line: text,
        remaining: "",
    };
};

const createTextLines = (canvas, text) => {
    const lines = [];
    let currentText = text;
    while (currentText !== "") {
        const separatedText = createTextLine(canvas, currentText);
        lines.push(separatedText.line);
        currentText = separatedText.remaining;
    }
    return lines;
};

const createOgp = async (dynamic) => {
    registerFont(path.resolve("./public/fonts/IBMPlexSansJP-Bold.ttf"), {
        family: "ibmjpb",
    });

    const logo = await loadImage(path.resolve("./assets/icon_b.svg"));
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#33ADFF";
    ctx.fillRect(0, 0, 1200, 630);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(20, 20, 1160, 590);

    ctx.font = "40px ibmjpb";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("MIZUAOI.NET", 870, 555);
    ctx.drawImage(logo, 752, 495, 108, 108);

    ctx.font = "60px ibmjpb";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    const title = dynamic.title;
    const lines = createTextLines(canvas, title);
    lines.forEach((line, index) => {
        const y = 314 + 80 * (index - (lines.length - 1) / 2);
        ctx.fillText(line, 600, y);
    });

    const buf = canvas.toBuffer();
    fs.writeFileSync(path.resolve(`./assets/ogp/${dynamic.id}.png`), buf);

};

export default createOgp;