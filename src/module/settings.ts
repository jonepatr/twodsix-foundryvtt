import {TWODSIX} from "./config";

export const registerSettings = function ():void {

  //Foundry default behaviour related settings
  _booleanSetting('defaultTokenSettings', true);

  const rulesetOptions = Object.entries(TWODSIX.RULESETS).map(([id, ruleset]) => {
    return [id, ruleset["name"]];
  });
  _stringChoiceSetting('ruleset', TWODSIX.RULESETS["CE"].name, Object.fromEntries(rulesetOptions), 'twodsix');

  //House rules/variant related settings
  const DEFAULT_INITIATIVE_FORMULA = "2d6 + @characteristics.dexterity.mod";
  _stringSetting('initiativeFormula', DEFAULT_INITIATIVE_FORMULA, 'world', formula => CONFIG.Combat.initiative = {
    formula: formula,
    decimals: 0
  });
  const DEFAULT_UNTRAINED = -2;
  _numberSetting('modifierForZeroCharacteristic', DEFAULT_UNTRAINED);
  _stringSetting('termForAdvantage', 'advantage');
  _stringSetting('termForDisadvantage', 'disadvantage');

  //Automation related settings
  _booleanSetting('effectOrTotal', false);
  _booleanSetting('automateDamageRollOnHit', false);

  //Cepheus weaponry related settings
  _booleanSetting('ShowLawLevel', false);
  _booleanSetting('ShowRangeBandAndHideRange', false);
  _booleanSetting('ShowWeaponType', false);
  _booleanSetting('ShowDamageType', false);
  _booleanSetting('ShowRateOfFire', true);
  _booleanSetting('ShowRecoil', false);

  _stringChoiceSetting('difficultyListUsed', TWODSIX.RULESETS.CE.key, TWODSIX.VARIANTS);
  _booleanSetting('difficultiesAsTargetNumber', false);

  _booleanSetting('ExperimentalFeatures', false);

  _booleanSetting('hideUntrainedSkills', false);
  _numberSetting('untrainedSkillValue', DEFAULT_UNTRAINED, 'client');

  _stringChoiceSetting('autofireRulesUsed', TWODSIX.RULESETS.CE.key, TWODSIX.VARIANTS);

  _booleanSetting('showMissingCompendiumWarnings', true);

  //As yet unused
  _numberSetting('maxSkillLevel', 9);
  _numberSetting('absoluteBonusValueForEachTimeIncrement', -1);

  //Must be the last setting in the file
  _stringSetting('systemMigrationVersion', game.system.data.version);

  //Utility functions
  function _booleanSetting(key:string, defaultValue:boolean, scope = 'world', onChange = null):void {
    game.settings.register('twodsix', key, {
      name: game.i18n.localize(`TWODSIX.Settings.${key}.name`),
      hint: game.i18n.localize(`TWODSIX.Settings.${key}.hint`),
      scope: scope,
      config: true,
      default: defaultValue,
      type: Boolean,
      onChange: onChange
    });
  }

  function _numberSetting(key:string, defaultValue:number, scope = 'world', onChange = null):void {
    game.settings.register('twodsix', key.replace('.', ''), {
      name: game.i18n.localize(`TWODSIX.Settings.${key}.name`),
      hint: game.i18n.localize(`TWODSIX.Settings.${key}.hint`),
      scope: scope,
      config: true,
      default: defaultValue,
      type: Number,
      onChange: onChange
    });
  }

  function _stringChoiceSetting(key:string, defaultValue:string, choices, scope = 'world', onChange = null):void {
    game.settings.register('twodsix', key.replace('.', ''), {
      name: game.i18n.localize(`TWODSIX.Settings.${key}.name`),
      hint: game.i18n.localize(`TWODSIX.Settings.${key}.hint`),
      scope: scope,
      config: true,
      default: defaultValue,
      type: String,
      onChange: onChange,
      choices: choices
    });
  }

  function _stringSetting(key:string, defaultValue:string, scope = 'world', onChange = null):void {
    game.settings.register('twodsix', key.replace('.', ''), {
      name: game.i18n.localize(`TWODSIX.Settings.${key}.name`),
      hint: game.i18n.localize(`TWODSIX.Settings.${key}.hint`),
      scope: scope,
      config: true,
      default: defaultValue,
      type: String,
      onChange: onChange
    });
  }
};
