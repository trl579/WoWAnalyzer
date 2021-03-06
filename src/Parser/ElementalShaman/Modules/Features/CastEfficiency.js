import React from 'react';

import SPELLS from 'common/SPELLS';

import CoreCastEfficiency from 'Parser/Core/Modules/CastEfficiency';
import getCastEfficiency from 'Parser/Core/getCastEfficiency';

import Tab from 'Main/Tab';

import CastEfficiencyComponent from './CastEfficiencyComponent';

class CastEfficiency extends CoreCastEfficiency {
  static SPELL_CATEGORIES = {
    ...CoreCastEfficiency.SPELL_CATEGORIES,
    DOTS: 'Dot',
  };
  static CPM_ABILITIES = [
    ...CoreCastEfficiency.CPM_ABILITIES,
    {
      spell: SPELLS.LAVA_BURST,
      charges: 2,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => null, // haste => 8 / (1 + haste)
      // TODO: Add Cooldown with stacks and Lava Surge procs
    },
    {
      spell: SPELLS.LIGHTNING_BOLT,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => null, // 1.5 / (1 + haste)
    },
    {
      spell: SPELLS.LIQUID_MAGMA_TOTEM,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL_AOE,
      isActive: combatant => combatant.hasTalent(SPELLS.LIQUID_MAGMA_TOTEM.id),
      getCooldown: haste => null,
    },
    {
      spell: SPELLS.CHAIN_LIGHTNING,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL_AOE,
      getCooldown: haste => null, // 2 / (1 + haste)
    },
    {
      spell: SPELLS.EARTHQUAKE,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL_AOE,
      getCooldown: haste => null,
    },
    {
      spell: SPELLS.ELEMENTAL_BLAST,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      isActive: combatant => combatant.hasTalent(SPELLS.ELEMENTAL_BLAST.id),
      getCooldown: haste => 12,
      recommendedCastEfficiency: 0.6,
    },
    {
      spell: SPELLS.ASCENDANCE,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 180,
      isActive: combatant => combatant.hasTalent(SPELLS.ASCENDANCE.id),
      recommendedCastEfficiency: 1.0,
    },
    {
      spell: SPELLS.STORMKEEPER,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 60,
    },
    {
      spell: SPELLS.FIRE_ELEMENTAL,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 60 * 5, // TODO: Add Elementalist -> Lava Burst cast ^= -2 sec cd
      recommendedCastEfficiency: 1.0,
    },
    {
      spell: SPELLS.FLAME_SHOCK,
      category: CastEfficiency.SPELL_CATEGORIES.DOTS,
      getCooldown: haste => null,
    },
    {
      spell: SPELLS.FROST_SHOCK,
      category: CastEfficiency.SPELL_CATEGORIES.DOTS,
      getCooldown: haste => null,
    },
  ];

  tab() {
    return {
      title: 'Cast efficiency',
      url: 'cast-efficiency',
      render: () => (
        <Tab title="Cast efficiency">
          <CastEfficiencyComponent
            categories={this.constructor.SPELL_CATEGORIES}
            abilities={getCastEfficiency(this.constructor.CPM_ABILITIES, this.owner)}
          />
        </Tab>
      ),
    };
  }
}

export default CastEfficiency;
