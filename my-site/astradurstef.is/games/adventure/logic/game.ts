import { gameData } from "../lib/game"
import { GameScene, type GameState } from "../types/game"
import { PlayerState } from "../types/player"

export default class Game {
  currentScene: string
  scenes: Record<string, GameScene>
  playerState: PlayerState

  constructor(game: GameState) {
    console.log("Game created")
    this.currentScene = game.currentScene
    this.scenes = game.scenes
    this.playerState = game.playerState
  }

  getGame(): GameState {
    return {
      currentScene: this.currentScene,
      scenes: this.scenes,
      playerState: this.playerState,
    }
  }

  getCurrentScene(): GameScene {
    return this.scenes[this.currentScene]
  }

  getScene(id: string): GameScene {
    return this.scenes[id]
  }

  getPlayerState(): PlayerState {
    return this.playerState
  }

  setCurrentScene(id: string): void {
    this.currentScene = id
  }

  setPlayerState(playerState: PlayerState): void {
    this.playerState = playerState
  }

  save(): void {
    localStorage.setItem("game", JSON.stringify(this))
  }

  static load(): Game {
    const game = localStorage.getItem("game")
    if (game) {
      return new Game(JSON.parse(game))
    } else {
      return new Game(gameData)
    }
  }

  static delete(): void {
    localStorage.removeItem("game")
  }

  static reset(): void {
    localStorage.removeItem("game")
  }

  static exists(): boolean {
    return !!localStorage.getItem("game")
  }

  static new(): Game {
    return new Game(gameData)
  }
}
