from __future__ import annotations
import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

DOMAIN = "ha_freeds"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry):
    """Set up Freeds from a config entry."""
    _LOGGER.info("Setting up Freeds  integration")

    # Forward the entry setup to the sensor platform
    await hass.config_entries.async_forward_entry_setups(entry, ["sensor"])

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry):
    """Unload a config entry."""
    _LOGGER.info("Unloading Freeds  integration")
    return await hass.config_entries.async_unload_platforms(entry, ["sensor"])
