# Freeds C588 Integration for Home Assistant

This custom integration allows you to monitor and display data from your Freeds C588 inverter in Home Assistant through MQTT.

## Features

- Real-time monitoring of inverter data
- Custom Lovelace card for data visualization
- Multiple sensor entities including:
  - Solar power production
  - Battery status and power
  - Grid power
  - Load/consumption
  - Temperature monitoring
  - Daily/Total energy statistics

## Installation

### Method 1: HACS (Recommended)

1. Ensure you have [HACS](https://hacs.xyz/) installed in your Home Assistant instance
2. Go to HACS → Integrations
3. Click the three dots in the top right corner
4. Click "Custom repositories"
5. Add this repository URL and select "Integration" as the category
6. Click "Add"
7. Find "Freeds C588 MQTT" in HACS and click "Download"
8. Restart Home Assistant

### Method 2: Manual Installation

1. Download this repository
2. Copy the `custom_components/freeds_c588` folder to your Home Assistant configuration directory:
   ```bash
   cp -r custom_components/freeds_c588 /config/custom_components/
   ```
3. Restart Home Assistant

## Configuration

### Basic Setup

1. Go to Home Assistant Configuration → Integrations
2. Click the "+" button to add a new integration
3. Search for "Freeds C588 MQTT"
4. Configure your MQTT topic prefix (default is "freeds_C588")

### MQTT Prerequisites

Ensure your MQTT broker is properly configured in Home Assistant and your Freeds C588 is publishing data to it.

## Using the Custom Card

### Installation

The custom card is automatically installed with the integration. No additional steps required.

### Adding the Card to Your Dashboard

1. Go to your dashboard
2. Click the three dots menu (⋮) in the top right
3. Click "Edit Dashboard"
4. Click the "+" button to add a new card
5. Scroll down to "Custom: Freeds Card" or search for "Freeds"
6. Configure the card with your entities:

```yaml
type: 'custom:freeds-card'
solar_entity: sensor.freeds_c588_solarw
battery_entity: sensor.freeds_c588_batteryw
grid_entity: sensor.freeds_c588_gridw
load_entity: sensor.freeds_c588_loadwatts
```

### Available Entities

All available sensor entities are prefixed with `sensor.freeds_c588_` followed by:

- `solarw` - Solar power production
- `batteryw` - Battery power
- `batterysoc` - Battery state of charge
- `gridw` - Grid power
- `loadwatts` - Load/consumption
- `invtemp` - Inverter temperature
- `kwtoday` - Energy produced today
- `kwtotal` - Total energy produced
- And many more...

## Troubleshooting

### Common Issues

1. **No data showing up?**
   - Check your MQTT broker connection
   - Verify the MQTT topic prefix matches your Freeds C588 configuration
   - Check Home Assistant logs for any error messages

2. **Custom card not appearing?**
   - Clear your browser cache
   - Restart Home Assistant
   - Check that the integration was installed correctly

3. **Missing entities?**
   - Make sure your Freeds C588 is publishing all required MQTT topics
   - Check the MQTT topic structure matches the expected format

### Debug Logging

To enable debug logging for this integration:

1. Add the following to your `configuration.yaml`:
```yaml
logger:
  default: info
  logs:
    custom_components.freeds_c588: debug
```
2. Restart Home Assistant

## Support

If you encounter any issues or need help:
1. Check the [Issues](https://github.com/your-repo/freeds_c588/issues) section
2. Create a new issue with:
   - Your Home Assistant version
   - Integration version
   - Debug logs
   - Description of the problem

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.