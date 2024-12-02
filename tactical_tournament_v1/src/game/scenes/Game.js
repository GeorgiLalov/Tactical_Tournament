import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

// Функция за създаване на текстура за клетка
function createTileTexture(scene, cellSize) {
    // Създаване на Graphics обект
    let graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Рисуване на квадрат с определен цвят
    graphics.fillStyle(0x4CAF50, 1); // Зелен цвят за клетка
    graphics.fillRect(0, 0, cellSize, cellSize); // Размери на клетката

    // Добавяне на черна граница около клетката
    graphics.lineStyle(2, 0x000000, 1); // Черна линия с дебелина 2px
    graphics.strokeRect(0, 0, cellSize, cellSize);

    // Генериране на текстура от Graphics обекта
    graphics.generateTexture('tile', cellSize, cellSize);

    // Унищожаване на Graphics обекта, тъй като вече сме създали текстурата
    graphics.destroy();
}

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.setPath('assets');

        // Създаване на текстурата за клетката
        // cellSize ще бъде дефиниран в create()
    }

    create ()
    {   
        // Define grid parameters
        const GRID_COLS = 14;
        const GRID_ROWS = 10;
        const BUTTON_HEIGHT_RATIO = 0.1; // 10% за бутони
        const canvasWidth = this.sys.game.config.width;
        const canvasHeight = this.sys.game.config.height;
        
        // Calculate cell size based on 90% of canvas height
        const usableHeight = canvasHeight * (1 - BUTTON_HEIGHT_RATIO);
        const cellSize = Math.min(canvasWidth / GRID_COLS, usableHeight / GRID_ROWS);
        
        createTileTexture(this, cellSize);
        
        // Calculate grid dimensions
        const gridWidth = cellSize * GRID_COLS;
        // const gridHeight = cellSize * GRID_ROWS;
        
        // Calculate offsets to center the grid horizontally and align to the top
        const offsetX = (canvasWidth - gridWidth) / 2;
        const offsetY = 0; // Align grid to the top
        
        // Store cell positions and create tile sprites
        this.gridCells = [];
        for (let row = 0; row < GRID_ROWS; row++) {
            this.gridCells[row] = [];
            for (let col = 0; col < GRID_COLS; col++) {
                const x = offsetX + col * cellSize + cellSize / 2;
                const y = offsetY + row * cellSize + cellSize / 2;
                
                const tile = this.add.sprite(x, y, 'tile').setDisplaySize(cellSize, cellSize);
                
                this.gridCells[row][col] = {
                    x: x,
                    y: y,
                    terrain: 'plain',
                    occupied: false,
                    unit: null,
                    sprite: tile
                };
                
            }
        }
        
        EventBus.emit('current-scene-ready', this);
        
        // Optional: Add a container for buttons at the bottom 10%
        // this.createButtonArea(usableHeight, canvasHeight);
    }
    
    createButtonArea(usableHeight, canvasHeight) {
        const buttonAreaHeight = canvasHeight * 0.1;
        const buttonY = usableHeight + buttonAreaHeight / 2;
        
        // Example button
        const button = this.add.text(this.sys.game.config.width / 2, buttonY, 'Start Battle', {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff',
            backgroundColor: '#0000ff',
            padding: { x: 20, y: 10 },
            align: 'center'
        }).setOrigin(0.5).setInteractive();
        
        button.on('pointerdown', () => {
            console.log('Start Battle button clicked');
            // Add button functionality here
        });
    }
}
