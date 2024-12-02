import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.setPath('assets');
        
        // this.load.image('star', 'star.png');
        // this.load.image('background', 'bg.png');
        // this.load.image('logo', 'logo.png');
    }

    create ()
    {   
        // Define grid parameters
        const GRID_COLS = 14;
        const GRID_ROWS = 10;
        const BUTTON_HEIGHT_RATIO = 0.1; // 10% for buttons
        const canvasWidth = this.sys.game.config.width;
        const canvasHeight = this.sys.game.config.height;
        
        // Calculate cell size based on 90% of canvas height
        const usableHeight = canvasHeight * (1 - BUTTON_HEIGHT_RATIO);
        const cellSize = Math.min(canvasWidth / GRID_COLS, usableHeight / GRID_ROWS);
        
        // Calculate grid dimensions
        const gridWidth = cellSize * GRID_COLS;
        const gridHeight = cellSize * GRID_ROWS;
        
        // Calculate offsets to center the grid horizontally and align to the top
        const offsetX = (canvasWidth - gridWidth) / 2;
        const offsetY = 0; // Align grid to the top
        
        // Create a graphics object for the grid
        const grid = this.add.graphics();
        grid.lineStyle(2, 0xffffff, 1);
        
        // Draw vertical lines
        for (let i = 0; i <= GRID_COLS; i++) {
            grid.moveTo(offsetX + i * cellSize, offsetY);
            grid.lineTo(offsetX + i * cellSize, offsetY + gridHeight);
        }
        
        // Draw horizontal lines
        for (let i = 0; i <= GRID_ROWS; i++) {
            grid.moveTo(offsetX, offsetY + i * cellSize);
            grid.lineTo(offsetX + gridWidth, offsetY + i * cellSize);
        }
        
        grid.strokePath();
        
        // Store cell positions
        this.gridCells = [];
        for (let row = 0; row < GRID_ROWS; row++) {
            this.gridCells[row] = [];
            for (let col = 0; col < GRID_COLS; col++) {
                this.gridCells[row][col] = {
                    x: offsetX + col * cellSize + cellSize / 2,
                    y: offsetY + row * cellSize + cellSize / 2,
                    occupied: false
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
