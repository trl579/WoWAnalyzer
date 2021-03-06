import ITEMS from 'common/ITEMS';
import SPELLS from 'common/SPELLS';
import Module from 'Parser/Core/Module';

class ArchimondesHatredReborn extends Module {
  healing = 0;

  on_initialized() {
    if (!this.owner.error) {
      this.active = this.owner.selectedCombatant.hasTrinket(ITEMS.ARCHIMONDES_HATRED_REBORN.id);
    }
  }

  on_byPlayer_absorbed(event) {
    const spellId = event.ability.guid;
    if (spellId === SPELLS.ARCHIMONDES_HATRED_REBORN_ABSORB.id) {
      this.healing += event.amount;
    }
  }

  item() {
    return {
      item: ITEMS.ARCHIMONDES_HATRED_REBORN,
      result:`${this.owner.formatItemHealingDone(this.healing)}`,
    };
  }
}

export default ArchimondesHatredReborn;
