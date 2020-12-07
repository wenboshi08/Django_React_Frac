import React, {Component} from 'react';
import {scaleOrdinal} from '@vx/scale';
import {LegendOrdinal} from '@vx/legend';

import {color as colors} from '@data-ui/theme';

import {RadialChart, ArcSeries, ArcLabel} from '@data-ui/radial-chart';

const colorScale = scaleOrdinal({range: colors.categories});

// const data = [{label: 'a', value: 200}, {label: 'c', value: 150}, {label: 'c', value: 21}];

class WellProportionPieChart extends Component {
    constructor(props) {
        super(props);
    }

    generateData = () => {
        const distinctWells = [...new Set(this.props.data.map(disclosure => disclosure.api_number))]
        const distinctWellsCount = distinctWells.length
        const totalDistinctWellsCount = 127434
        const data = [{label: 'This filter covered', value: distinctWellsCount}, {label: 'Rest in database', value: totalDistinctWellsCount - distinctWellsCount}]
        return data;
    }

    render() {
        return (
            <div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <RadialChart
                        ariaLabel="This is a radial-chart chart of..."
                        width={400}
                        height={400}
                        margin={{top: 0, right: 0, bottom: 0, left: 0}}
                        renderTooltip={({event, datum, data, fraction}) => (
                            <div>
                                <strong>{datum.label}</strong>
                                {datum.value} ({(fraction * 100).toFixed(2)}%)
                            </div>
                        )}
                    >
                        <ArcSeries
                            data={this.generateData()}
                            pieValue={d => d.value}
                            fill={arc => colorScale(arc.data.label)}
                            stroke="#fff"
                            strokeWidth={1}
                            label={arc => `${arc.data.value} well sites`}
                            labelComponent={<ArcLabel/>}
                            innerRadius={radius => 0.35 * radius}
                            outerRadius={radius => 0.6 * radius}
                            labelRadius={radius => 0.75 * radius}
                        />
                    </RadialChart>
                    <LegendOrdinal
                        direction="column"
                        scale={colorScale}
                        shape="rect"
                        fill={({datum}) => colorScale(datum)}
                        labelFormat={label => label}
                    />
                </div>
            </div>
        );
    }
}

export default WellProportionPieChart;