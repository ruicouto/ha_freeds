"""Freeds C588 MQTT integration."""
from homeassistant.core import HomeAssistant

DOMAIN = "freeds_c588"

async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the Freeds C588 integration (nothing to do here)."""
    return True

async def async_setup_entry(hass, entry):
    """Set up Freeds C588 from a config entry."""
    hass.config_entries.async_setup_platforms(entry, ["sensor"])
    return True
