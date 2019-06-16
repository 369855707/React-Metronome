import React, { Component } from 'react'
import './Metronome.css'

import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {

    constructor(props) {
        super(props)

        this.state = {
            bpm: 120,
            playing: false,
            beatsPerMeasure: 4,
            timer: null
        }

        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    handleBpmChange = event => {
        const bpm = event.target.value;
        this.setState({
            bpm
        });
        if (this.state.playing) {
            this.stopBeat();
            this.startBeat();
        }
    }

    stopBeat = () => {
        this.setState({ playing: false })
        clearInterval(this.timer);
    }

    startBeat = () => {
        let count = 0;
        this.setState({ playing: true })
        this.timer = setInterval(() => {
            if (count % 4 == 0) {
                this.click1.play();
            } else {
                this.click2.play();
            }
            count++;
        }, (60 * 1000) / this.state.bpm);
    }

    beatOrStop = () => {
        if (this.state.playing) {
            this.setState({ playing: false })
            clearInterval(this.timer);
        } else {
            let count = 0;
            this.setState({ playing: true })
            this.timer = setInterval(() => {
                if (count % 4 == 0) {
                    this.click1.play();
                } else {
                    this.click2.play();
                }
                count++;
            }, (60 * 1000) / this.state.bpm);
        }

    }

    render() {

        const { playing, bpm } = this.state;

        return (
            <div className="metronome">
                <div className="bpm-slider">
                    <div>{bpm} BPM</div>
                    <input
                        type="range"
                        min="60"
                        max="240"
                        value={bpm}
                        onChange={this.handleBpmChange} />
                </div>
                <button onClick={this.beatOrStop}>{playing ? 'Stop' : 'Start'}</button>
            </div>
        )
    }
}

export default Metronome