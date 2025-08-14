<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pong</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: #000;
            color: #fff;
            font-family: 'Courier New', monospace;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-size: 16px;
        }

        .game {
            text-align: center;
        }

        .score {
            margin-bottom: 10px;
            font-size: 18px;
        }

        .canvas {
            font-family: 'Courier New', monospace;
            line-height: 1;
            white-space: pre;
            border: 1px solid #333;
            padding: 10px;
            background: #000;
            position: relative;
            width: 500px;
            height: 300px;
        }

        .entity {
            position: absolute;
            font-family: 'Courier New', monospace;
            font-size: 16px;
            color: #fff;
            transition: none;
            pointer-events: none;
        }

        .start {
            margin-top: 10px;
        }

        button {
            background: transparent;
            color: #fff;
            border: 1px solid #fff;
            padding: 8px 16px;
            font-family: inherit;
            font-size: 14px;
            cursor: pointer;
        }

        button:hover {
            background: #fff;
            color: #000;
        }

        .controls {
            margin-top: 10px;
            font-size: 12px;
            color: #666;
        }

        .ball {
            color: #0a84ff !important;
        }
    </style>
</head>
<body>
    <div class="game">
        <div class="score"><span id="playerScore">0</span> - <span id="aiScore">0</span></div>
        <div id="canvas" class="canvas"></div>
        <div class="start">
            <button onclick="pong.start()" id="startBtn">Start</button>
        </div>
        <div class="controls">Mouse wheel or ↑/↓ arrows to move</div>
    </div>

    <script>
        class Pong {
            constructor() {
                this.canvas = document.getElementById('canvas');
                this.playerScoreEl = document.getElementById('playerScore');
                this.aiScoreEl = document.getElementById('aiScore');
                this.startBtn = document.getElementById('startBtn');
                
                this.canvasWidth = 480;
                this.canvasHeight = 280;
                this.running = false;
                
                this.playerScore = 0;
                this.aiScore = 0;
                
                this.playerY = 140;
                this.aiY = 140;
                this.paddleHeight = 60;
                this.paddleWidth = 8;
                
                this.ballX = 240;
                this.ballY = 140;
                this.ballDX = 3;
                this.ballDY = 2;
                this.ballSpeed = 3;
                this.ballSize = 8;
                
                this.gameTime = 0;
                
                this.keys = {};
                
                document.addEventListener('keydown', (e) => {
                    this.keys[e.code] = true;
                });
                
                document.addEventListener('keyup', (e) => {
                    this.keys[e.code] = false;
                });
                
                // Mouse wheel control
                document.addEventListener('wheel', (e) => {
                    e.preventDefault();
                    const sensitivity = 3;
                    if (e.deltaY > 0 && this.playerY < this.canvasHeight - this.paddleHeight - 5) {
                        this.playerY += sensitivity;
                    } else if (e.deltaY < 0 && this.playerY > 5) {
                        this.playerY -= sensitivity;
                    }
                }, { passive: false });
                
                this.render();
            }
            
            start() {
                this.running = !this.running;
                this.startBtn.textContent = this.running ? 'Pause' : 'Start';
                
                if (this.running) {
                    this.loop();
                }
            }
            
            reset() {
                this.ballX = this.canvasWidth / 2;
                this.ballY = Math.random() * (this.canvasHeight - 40) + 20;
                const direction = Math.random() > 0.5 ? 1 : -1;
                this.ballDX = this.ballSpeed * direction;
                this.ballDY = (Math.random() - 0.5) * this.ballSpeed;
            }
            
            update() {
                if (!this.running) return;
                
                this.gameTime++;
                
                // Increase ball speed gradually
                if (this.gameTime % 600 === 0) { // Every 10 seconds at 60fps
                    this.ballSpeed += 0.3;
                }
                
                // Arrow key movement (fallback for no mouse wheel)
                if (this.keys['ArrowUp'] && this.playerY > 5) {
                    this.playerY -= 4;
                }
                if (this.keys['ArrowDown'] && this.playerY < this.canvasHeight - this.paddleHeight - 5) {
                    this.playerY += 4;
                }
                
                // Ball movement
                this.ballX += this.ballDX;
                this.ballY += this.ballDY;
                
                // Ball collision with top/bottom
                if (this.ballY <= 0 || this.ballY >= this.canvasHeight - this.ballSize) {
                    this.ballDY = -this.ballDY;
                }
                
                // Ball collision with player paddle
                if (this.ballX <= 20 && this.ballX >= 15 && 
                    this.ballY >= this.playerY - this.ballSize && 
                    this.ballY <= this.playerY + this.paddleHeight) {
                    this.ballDX = Math.abs(this.ballSpeed);
                    // Add some angle based on where it hits the paddle
                    this.ballDY = (this.ballY - (this.playerY + this.paddleHeight/2)) * 0.1;
                }
                
                // Ball collision with AI paddle
                if (this.ballX >= this.canvasWidth - 25 && this.ballX <= this.canvasWidth - 20 && 
                    this.ballY >= this.aiY - this.ballSize && 
                    this.ballY <= this.aiY + this.paddleHeight) {
                    this.ballDX = -Math.abs(this.ballSpeed);
                    this.ballDY = (this.ballY - (this.aiY + this.paddleHeight/2)) * 0.1;
                }
                
                // AI movement (slightly imperfect)
                const aiCenter = this.aiY + this.paddleHeight / 2;
                const diff = this.ballY - aiCenter;
                
                if (Math.abs(diff) > 3) {
                    if (diff > 0 && this.aiY < this.canvasHeight - this.paddleHeight - 5) {
                        this.aiY += 2.5;
                    } else if (diff < 0 && this.aiY > 5) {
                        this.aiY -= 2.5;
                    }
                }
                
                // Scoring
                if (this.ballX < 0) {
                    this.aiScore++;
                    this.reset();
                } else if (this.ballX > this.canvasWidth) {
                    this.playerScore++;
                    this.reset();
                }
                
                this.playerScoreEl.textContent = this.playerScore;
                this.aiScoreEl.textContent = this.aiScore;
            }
            
            render() {
                // Clear canvas
                this.canvas.innerHTML = '';
                
                // Draw center line
                for (let y = 0; y < this.canvasHeight; y += 20) {
                    const line = document.createElement('div');
                    line.className = 'entity';
                    line.textContent = '|';
                    line.style.left = `${this.canvasWidth/2 - 4}px`;
                    line.style.top = `${y}px`;
                    line.style.opacity = '0.3';
                    this.canvas.appendChild(line);
                }
                
                // Draw player paddle
                for (let i = 0; i < this.paddleHeight; i += 8) {
                    const paddle = document.createElement('div');
                    paddle.className = 'entity';
                    paddle.textContent = '█';
                    paddle.style.left = '15px';
                    paddle.style.top = `${this.playerY + i}px`;
                    this.canvas.appendChild(paddle);
                }
                
                // Draw AI paddle
                for (let i = 0; i < this.paddleHeight; i += 8) {
                    const paddle = document.createElement('div');
                    paddle.className = 'entity';
                    paddle.textContent = '█';
                    paddle.style.left = `${this.canvasWidth - 20}px`;
                    paddle.style.top = `${this.aiY + i}px`;
                    this.canvas.appendChild(paddle);
                }
                
                // Draw ball
                const ball = document.createElement('div');
                ball.className = 'entity ball';
                ball.textContent = '●';
                ball.style.left = `${this.ballX}px`;
                ball.style.top = `${this.ballY}px`;
                this.canvas.appendChild(ball);
            }
            
            loop() {
                this.update();
                this.render();
                if (this.running) {
                    requestAnimationFrame(() => this.loop());
                }
            }
        }
        
        const pong = new Pong();
    </script>
</body>
</html>