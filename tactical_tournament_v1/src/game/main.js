import { Game as MainGame } from './scenes/Game';
import { AUTO, Game, Scale } from 'phaser';

// Phaser Game Configuration
const config = {
    type: AUTO,
    parent: 'game-container',
    width: 1024,
    height: 768,
    backgroundColor: '#028af8',
    scene: [
        MainGame
    ],
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
        min: {
            width: 640,
            height: 480
        },
        max: {
            width: 1024,
            height: 768
        },
        // Optional: Set to resize the game when the window size changes
        // This ensures the game scales dynamically
        // Set to true if you want the game to resize automatically
        // Otherwise, handle resizing manually
        // parent: 'game-container', // Already defined above
    }
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
}

export default StartGame;

