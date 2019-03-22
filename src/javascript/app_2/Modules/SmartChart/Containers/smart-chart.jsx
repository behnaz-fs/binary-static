import {
    SmartChart,
    setSmartChartsPublicPath } from 'smartcharts-beta';
import PropTypes               from 'prop-types';
import React                   from 'react';
import Url                     from '_common/url';
import { connect }             from 'Stores/connect';
import BottomWidgets           from '../Components/bottom-widgets.jsx';
import ControlWidgets          from '../Components/control-widgets.jsx';
import ChartMarker             from '../Components/Markers/marker.jsx';
import TopWidgets              from '../Components/top-widgets.jsx';
import { symbolChange }        from '../Helpers/symbol';

setSmartChartsPublicPath(Url.urlForStatic('js/smartcharts/'));

class Chart extends React.Component {
    componentWillUnmount() { this.props.onUnmount(); }

    chartControlsWidgets = () => (
        <ControlWidgets
            updateChartType={this.props.updateChartType}
            updateGranularity={this.props.updateGranularity}
        />
    );

    topWidgets = () => (
        <TopWidgets
            InfoBox={this.props.InfoBox}
            is_title_enabled={this.props.is_title_enabled}
            onSymbolChange={symbolChange(this.props.onSymbolChange)}
        />
    );

    bottomWidgets = () => (
        <BottomWidgets Digits={this.props.Digits} />
    );

    render() {
        return (
            <SmartChart
                barriers={this.props.barriers_array}
                bottomWidgets={this.props.should_show_last_digit_stats ? undefined : this.bottomWidgets}
                chartControlsWidgets={this.chartControlsWidgets}
                chartType={this.props.chart_type}
                endEpoch={this.props.end_epoch}
                granularity={this.props.granularity}
                id={this.props.chart_id}
                isMobile={this.props.is_mobile}
                requestAPI={this.props.wsSendRequest}
                requestForget={this.props.wsForget}
                requestSubscribe={this.props.wsSubscribe}
                settings={this.props.settings}
                showLastDigitStats={this.props.should_show_last_digit_stats}
                startEpoch={this.props.start_epoch}
                scrollToEpoch={this.props.scroll_to_epoch}
                scrollToEpochOffset={this.props.scroll_to_offset}
                symbol={this.props.symbol}
                topWidgets={this.topWidgets}
                isConnectionOpened={this.props.is_socket_opened}
                clearChart={this.props.should_clear_chart}
                importedLayout={this.props.should_import_layout ? this.props.trade_chart_layout : null}
                onExportLayout={this.props.should_save_layout ? this.props.exportLayout : null}
                zoom={this.props.chart_zoom}
            >
                { this.props.markers_array.map((marker, idx) => (
                    <ChartMarker
                        key={idx}
                        marker_config={marker.marker_config}
                        marker_content_props={marker.content_config}
                    />
                ))}
            </SmartChart>
        );
    }
}

Chart.propTypes = {
    barriers_array              : PropTypes.array,
    BottomWidgets               : PropTypes.node,
    chart_id                    : PropTypes.number,
    chart_type                  : PropTypes.string,
    chart_zoom                  : PropTypes.number,
    end_epoch                   : PropTypes.number,
    exportLayout                : PropTypes.func,
    granularity                 : PropTypes.number,
    InfoBox                     : PropTypes.node,
    is_contract_mode            : PropTypes.bool,
    is_mobile                   : PropTypes.bool,
    is_socket_opened            : PropTypes.bool,
    is_title_enabled            : PropTypes.bool,
    markers_array               : PropTypes.array,
    onSymbolChange              : PropTypes.func,
    onUnmount                   : PropTypes.func,
    scroll_to_epoch             : PropTypes.number,
    scroll_to_epoch_offset      : PropTypes.number,
    settings                    : PropTypes.object,
    should_clear_chart          : PropTypes.bool,
    should_import_layout        : PropTypes.bool,
    should_save_layout          : PropTypes.bool,
    should_show_last_digit_stats: PropTypes.bool,
    start_epoch                 : PropTypes.number,
    symbol                      : PropTypes.string,
    trade_chart_layout          : PropTypes.object,
    wsForget                    : PropTypes.func,
    wsSendRequest               : PropTypes.func,
    wsSubscribe                 : PropTypes.func,
};

export default connect(
    ({ modules, ui, common }) => ({
        is_socket_opened    : common.is_socket_opened,
        barriers_array      : modules.smart_chart.barriers_array,
        is_contract_mode    : modules.smart_chart.is_contract_mode,
        exportLayout        : modules.smart_chart.exportLayout,
        is_title_enabled    : modules.smart_chart.is_title_enabled,
        markers_array       : modules.smart_chart.markers_array,
        onUnmount           : modules.smart_chart.onUnmount,
        settings            : modules.smart_chart.settings,
        should_clear_chart  : modules.smart_chart.should_clear_chart,
        should_import_layout: modules.smart_chart.should_import_layout,
        should_save_layout  : modules.smart_chart.should_save_layout,
        trade_chart_layout  : modules.smart_chart.trade_chart_layout,
        wsForget            : modules.smart_chart.wsForget,
        wsSendRequest       : modules.smart_chart.wsSendRequest,
        wsSubscribe         : modules.smart_chart.wsSubscribe,
        is_mobile           : ui.is_mobile,
    })
)(Chart);
