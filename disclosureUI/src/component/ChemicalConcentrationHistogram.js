import React, {Component} from 'react';
import {Histogram, DensitySeries, BarSeries, withParentSize, XAxis, YAxis} from '@data-ui/histogram';

const ResponsiveHistogram = withParentSize(({parentWidth, parentHeight, ...rest}) => (
    <Histogram
        width={parentWidth}
        height={parentHeight}
        {...rest}
    />
));


class ChemicalConcentrationHistogram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            concentrationData: [],
        }
    }

    componentDidMount() {
        console.log(this.props.data);
        const concentrationData = this.props.data.map((disclosure) => {
            return disclosure.percent_high_additive;
        });
        this.setState({
            concentrationData: concentrationData,
        })
    }

    render() {
        return (
            <div style={{height: 400}}>
            <ResponsiveHistogram
                ariaLabel="My histogram of ..."
                orientation="vertical"
                cumulative={false}
                normalized={false}
                binCount={25}
                valueAccessor={datum => datum}
                binType="numeric"
                renderTooltip={({event, datum, data, color}) => (
                    <div>
                        <strong style={{color}}>{datum.bin0} to {datum.bin1}</strong>
                        <div><strong>count </strong>{datum.count}</div>
                        <div><strong>cumulative </strong>{datum.cumulative}</div>
                        <div><strong>density </strong>{datum.density}</div>
                    </div>
                )}
            >
                <BarSeries
                    animated
                    rawData={this.state.concentrationData}
                />
                <XAxis label="Chemical Concentration mg/L"/>
                <YAxis label="Count"/>
            </ResponsiveHistogram>
            </div>
        );
    }
}

export default ChemicalConcentrationHistogram;