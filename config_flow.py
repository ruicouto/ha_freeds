"""Config flow for Freeds integration."""
from __future__ import annotations
import voluptuous as vol
from homeassistant import config_entries

DOMAIN = "ha_freeds"

class HAFreedsConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Freeds ."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle the initial step."""
        errors = {}

        if user_input is not None:
            # User submitted the form, create an entry
            return self.async_create_entry(
                title="Freeds",
                data=user_input
            )

        # Show the form
        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Optional("topic_prefix", default="ha_freeds"): str,
                }
            ),
            errors=errors
        )
