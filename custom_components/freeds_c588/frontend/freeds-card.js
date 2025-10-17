class FreedsCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
        <ha-card header="Freeds C588 Status">
          <div class="card-content">
            <style>
              .grid-container {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 16px;
                padding: 16px;
              }
              .metric {
                text-align: center;
                padding: 16px;
                background: var(--card-background-color);
                border-radius: 8px;
                box-shadow: var(--ha-card-box-shadow, none);
              }
              .metric-value {
                font-size: 24px;
                font-weight: bold;
                margin: 8px 0;
              }
              .metric-label {
                color: var(--secondary-text-color);
                font-size: 14px;
              }
              .power-flow {
                grid-column: span 2;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px;
                background: var(--card-background-color);
                border-radius: 8px;
                margin-top: 16px;
              }
            </style>
            <div class="grid-container">
              <div class="metric solar">
                <ha-icon icon="mdi:solar-power"></ha-icon>
                <div class="metric-value" id="solar">0 W</div>
                <div class="metric-label">Solar Production</div>
              </div>
              <div class="metric battery">
                <ha-icon icon="mdi:battery"></ha-icon>
                <div class="metric-value" id="battery">0 W</div>
                <div class="metric-label">Battery Power</div>
              </div>
              <div class="metric grid">
                <ha-icon icon="mdi:transmission-tower"></ha-icon>
                <div class="metric-value" id="grid">0 W</div>
                <div class="metric-label">Grid Power</div>
              </div>
              <div class="metric load">
                <ha-icon icon="mdi:home"></ha-icon>
                <div class="metric-value" id="load">0 W</div>
                <div class="metric-label">Home Consumption</div>
              </div>
            </div>
          </div>
        </ha-card>
      `;
      this.content = true;
    }

    const config = this._config;
    
    // Update values
    this.updateMetric(hass, config.solar_entity, 'solar');
    this.updateMetric(hass, config.battery_entity, 'battery');
    this.updateMetric(hass, config.grid_entity, 'grid');
    this.updateMetric(hass, config.load_entity, 'load');
  }

  updateMetric(hass, entityId, elementId) {
    if (entityId && hass.states[entityId]) {
      const state = hass.states[entityId].state;
      const element = this.querySelector(`#${elementId}`);
      if (element) {
        element.textContent = `${state} W`;
      }
    }
  }

  setConfig(config) {
    if (!config.solar_entity || !config.battery_entity || !config.grid_entity || !config.load_entity) {
      throw new Error('Please define all required entities');
    }
    this._config = config;
  }

  getCardSize() {
    return 4;
  }

  static getConfigElement() {
    return document.createElement('freeds-card-editor');
  }

  static getStubConfig() {
    return {
      solar_entity: 'sensor.freeds_c588_solarw',
      battery_entity: 'sensor.freeds_c588_batteryw',
      grid_entity: 'sensor.freeds_c588_gridw',
      load_entity: 'sensor.freeds_c588_loadwatts'
    };
  }
}

customElements.define('freeds-card', FreedsCard);

// Card Editor
class FreedsCardEditor extends HTMLElement {
  setConfig(config) {
    this.config = config;
  }

  render() {
    if (!this.config) {
      return;
    }

    this.innerHTML = `
      <form class="card-config">
        <ha-entity-picker
          .label="Solar Power Entity"
          .hass=${this.hass}
          .value=${this.config.solar_entity}
          .configValue=${'solar_entity'}
          @value-changed=${this._valueChanged}
        ></ha-entity-picker>
        <ha-entity-picker
          .label="Battery Power Entity"
          .hass=${this.hass}
          .value=${this.config.battery_entity}
          .configValue=${'battery_entity'}
          @value-changed=${this._valueChanged}
        ></ha-entity-picker>
        <ha-entity-picker
          .label="Grid Power Entity"
          .hass=${this.hass}
          .value=${this.config.grid_entity}
          .configValue=${'grid_entity'}
          @value-changed=${this._valueChanged}
        ></ha-entity-picker>
        <ha-entity-picker
          .label="Load Power Entity"
          .hass=${this.hass}
          .value=${this.config.load_entity}
          .configValue=${'load_entity'}
          @value-changed=${this._valueChanged}
        ></ha-entity-picker>
      </form>
    `;
  }

  _valueChanged(ev) {
    if (!this.config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (this.config[target.configValue] === target.value) {
      return;
    }
    this.config = {
      ...this.config,
      [target.configValue]: target.value,
    };
    const event = new CustomEvent('config-changed', {
      detail: { config: this.config },
    });
    this.dispatchEvent(event);
  }
}

customElements.define('freeds-card-editor', FreedsCardEditor);