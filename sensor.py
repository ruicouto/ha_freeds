



"""Freeds C588 MQTT sensors."""
from __future__ import annotations
import logging

from homeassistant.components import mqtt
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.typing import ConfigType

_LOGGER = logging.getLogger(__name__)

DOMAIN = "freeds_c588"

# All Freeds C588 subtopics to expose
TOPICS = [
    "pv1w", "pv1v", "pv2c", "pv2v", "pv2w", "pv1c",
    "todayW", "invTemp", "solarW", "batteryV", "calcWatts",
    "gridW", "gridC", "batteryC", "batteryW", "batterySoC",
    "loadWatts", "AcIn", "AcOut", "tempTermo", "tempTriac",
    "tempCustom", "KwToday", "KwYesterday", "KwExportToday",
    "KwExportYesterday", "KwTotal", "KwExportTotal", "pwm",
    "houseConsumption", "stat/pwm", "relay/1/STATUS", "relay/2/STATUS"
]


class FreedsC588Sensor(Entity):
    """Represents a single MQTT topic as a sensor."""

    def __init__(self, hass, topic: str):
        self._hass = hass
        self._topic = topic
        self._state = None
        self._name = topic.replace("/", "_").lower()
        self.entity_id = f"{DOMAIN}.{self._name}"

    @property
    def name(self):
        return self._name

    @property
    def state(self):
        return self._state

    @property
    def unique_id(self):
        return self._topic

    async def async_added_to_hass(self):
        """Subscribe to MQTT topic when added to HA."""

        @mqtt.callback
        def message_received(msg: mqtt.ReceiveMessage):
            payload = msg.payload
            if isinstance(payload, bytes):
                payload = payload.decode("utf-8")
            self._state = payload
            self.async_write_ha_state()
            _LOGGER.debug(f"{self.entity_id} <- {payload}")

        await mqtt.async_subscribe(self._hass, self._topic, message_received)


async def async_setup_platform(hass, config: ConfigType, async_add_entities, discovery_info=None):
    """Set up all Freeds C588 MQTT sensors."""
    topic_prefix = config.get("topic_prefix", "freeds_C588")

    sensors = [FreedsC588Sensor(hass, f"{topic_prefix}/{sub}") for sub in TOPICS]

    async_add_entities(sensors)
    _LOGGER.info(f"✅ {DOMAIN}: {len(sensors)} sensors added, prefix={topic_prefix}")
