import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Embed from '../Embed';
import { createConfig } from '../common/config';
import { dashboardHandler } from '../common/onEmbedHandlers';

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentConfig: null,
    };
    this.performOnEmbed = this.performOnEmbed.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.updateState(this.props);
  }

  static getDerivedStateFromProps(props) {
    return { currentConfig: createConfig(props) };
  }

  performOnEmbed(dashboard, dashboardRef) {
    dashboardHandler(dashboard, dashboardRef, this.props);
  }

  updateState(props) {
    this.setState({
      currentConfig: createConfig(props),
    });
  }

  render() {
    if (!this.state.currentConfig) {
      return <div> Error </div>;
    }

    return (
      <Embed
        config={this.state.currentConfig}
        performOnEmbed={this.performOnEmbed}
        style={this.props.style}
      />
    );
  }
}

Dashboard.propTypes = {
  embedType: PropTypes.string.isRequired,
  tokenType: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  embedUrl: PropTypes.string.isRequired,
  embedId: PropTypes.string,
  pageView: PropTypes.string,
  style: PropTypes.object,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  onTileClicked: PropTypes.func,
};

export default Dashboard;
