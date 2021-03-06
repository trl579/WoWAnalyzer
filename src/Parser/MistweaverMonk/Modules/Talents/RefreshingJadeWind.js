import React from 'react';

import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';
import { formatPercentage } from 'common/format';

import Module from 'Parser/Core/Module';

const debug = false;

class RefreshingJadeWind extends Module {
  // Implement Mists of Sheilun, Celestial Breath, and Refreshing Jade Wind
  healsRJW = 0;
  healingRJW = 0;
  overhealingRJW = 0;
  castRJW = 0;

  on_initialized() {
    this.active = this.owner.selectedCombatant.hasTalent(SPELLS.REFRESHING_JADE_WIND_TALENT.id);
  }
  on_byPlayer_applybuff(event) {
    const spellId = event.ability.guid;

    if(spellId === SPELLS.REFRESHING_JADE_WIND_TALENT.id) {
      this.castRJW++;
    }
  }

  on_byPlayer_heal(event) {
    const spellId = event.ability.guid;

    if(spellId === SPELLS.REFRESHING_JADE_WIND_HEAL.id) {
      this.healsRJW++;
      this.healingRJW += event.amount;
      if(event.overheal) {
        this.overhealingRJW += event.amount;
      }
    }
  }

  suggestions(when) {
    const avgRJWTargetsPercentage = (this.healsRJW / this.castRJW) / 78 || 0;

    when(avgRJWTargetsPercentage).isLessThan(.9)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest(<span>You are not utilizing your <SpellLink id={SPELLS.REFRESHING_JADE_WIND_TALENT.id} /> effectively. <SpellLink id={SPELLS.REFRESHING_JADE_WIND_TALENT.id} /> excells when you hit 6 targets for the duration of the spell. The easiest way to accomplish this is to stand in melee, but there can be other uses when the raid stacks for various abilities.</span>)
          .icon(SPELLS.REFRESHING_JADE_WIND_TALENT.icon)
          .actual(`${formatPercentage(this.avgRJWTargetsPercentage)}% of targets hit per Refreshing Jade Wind`)
          .recommended(`>${formatPercentage(recommended)}% is recommended`)
          .regular(recommended - 0.1).major(recommended - 0.2);
      });
  }

  /* Commenting out for now - Removing because of bloat.
  statistic() {
    const avgRJWHealing = this.healingRJW / this.castRJW || 0;
    const avgRJWTargets = this.healsRJW / this.castRJW || 0;
    return (
      <StatisticBox
        icon={<SpellIcon id={SPELLS.REFRESHING_JADE_WIND_TALENT.id} />}
        value={`${formatNumber(avgRJWHealing)}`}
        label={(
          <dfn data-tip={`You hit a total of ${this.healsRJW} targets with Refreshing Jade Wind on ${this.castRJW} casts. (${(avgRJWTargets).toFixed(1)} Average Targets Hit per Cast.)`}>
            Average Healing
          </dfn>
        )}
      />
      );
    }
  statisticOrder = STATISTIC_ORDER.OPTIONAL();
  */

  on_finished() {
    if(debug) {
      console.log('RJW Casts: ' + this.castRJW);
      console.log('RJW Targets Hit: ' + this.healsRJW);
      console.log('RJW Targets Hit per Cast: ', (this.healsRJW / this.castRJW));
      console.log('Avg Heals per Cast: ' + (this.healingRJW / this.castRJW));
      console.log('Avg Heals Amount: ' + (this.healingRJW / this.healsRJW));
    }
  }
}

export default RefreshingJadeWind;
