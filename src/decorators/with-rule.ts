import {Ruleset, RuleLink} from "@treacherous/core";
import {getRulesetFromMetadata, updateRulesetMetadata} from "../helpers/metadata-helper";
import {AppliesIfFunction, MessageOverrideFunction} from "./method-types";

export function withRule(ruleName: string, ruleOptions?: any, 
    appliesIf?: boolean | AppliesIfFunction, 
    messageOverride?: string | MessageOverrideFunction) {
    
    return function(target: Object, propertyKey: string) : void
    {
        const existingRuleset = getRulesetFromMetadata(target);
        const ruleLink = new RuleLink(ruleName, ruleOptions);

        if(typeof appliesIf !== "undefined")
        { ruleLink.appliesIf = appliesIf; }

        if(typeof messageOverride !== "undefined")
        { ruleLink.messageOverride = messageOverride; }

        existingRuleset.addRule(propertyKey, ruleLink);        
        updateRulesetMetadata(target, existingRuleset);
    };
}