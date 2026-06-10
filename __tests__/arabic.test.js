const PII_PATTERNS = {
  email: {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    replacement: '[email removed]',
    description: 'Email addresses'
  },
  phone: {
    pattern: /(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})(?:\s?(?:ext|x|extension)\.?\s?(\d+))?/g,
    replacement: '[phone removed]',
    description: 'Phone numbers'
  },
  ssn: {
    pattern: /\b(?!000|666|9\d{2})\d{3}-?(?!00)\d{2}-?(?!0000)\d{4}\b/g,
    replacement: '[SSN removed]',
    description: 'Social Security Numbers'
  },
  creditCard: {
    pattern: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,
    replacement: '[credit card removed]',
    description: 'Credit card numbers'
  },
  ipAddress: {
    pattern: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    replacement: '[IP address removed]',
    description: 'IP addresses'
  },
  address: {
    pattern: /\b\d+\s+[A-Za-z0-9\s,.-]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Circle|Cir|Way|Place|Pl|Parkway|Pkwy|Terrace|Ter)\b/gi,
    replacement: '[address removed]',
    description: 'Street addresses'
  },
  passport: {
    pattern: /\b[A-Z]{2}[0-9]{7}\b/g,
    replacement: '[passport number removed]',
    description: 'Passport numbers'
  },
  driversLicense: {
    pattern: /\b[A-Z]{1,2}[0-9]{6,9}\b/g,
    replacement: '[driver\'s license removed]',
    description: 'Driver\'s license numbers'
  },
  zipCode: {
    pattern: /(?<!\d-)\b\d{5}(?:-\d{4})?\b(?!-\d)/g,
    replacement: '[zip code removed]',
    description: 'ZIP codes'
  },
  bankAccount: {
    pattern: /\b\d{8,17}\b/g,
    replacement: '[bank account removed]',
    description: 'Bank account numbers'
  },
  url: {
    pattern: /https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)?/g,
    replacement: '[URL removed]',
    description: 'URLs'
  },
  dateOfBirth: {
    pattern: /\b(?:0[1-9]|1[0-2])[-\/](?:0[1-9]|[12][0-9]|3[01])[-\/](?:19|20)\d{2}\b/g,
    replacement: '[date removed]',
    description: 'Dates of birth'
  }
};

const DEFAULT_CONFIG = {
  email: { remove: true, replacement: '[email removed]' },
  phone: { remove: true, replacement: '[phone removed]' },
  ssn: { remove: true, replacement: '[SSN removed]' },
  creditCard: { remove: true, replacement: '[credit card removed]' },
  ipAddress: { remove: true, replacement: '[IP address removed]' },
  address: { remove: true, replacement: '[address removed]' },
  passport: { remove: true, replacement: '[passport number removed]' },
  driversLicense: { remove: true, replacement: '[driver\'s license removed]' },
  zipCode: { remove: true, replacement: '[zip code removed]' },
  bankAccount: { remove: true, replacement: '[bank account removed]' },
  url: { remove: false, replacement: '[URL removed]' },
  dateOfBirth: { remove: true, replacement: '[date removed]' }
};

function validateInput(text) {
  if (text === null || text === undefined) {
    throw new TypeError('Input cannot be null or undefined');
  }
  if (typeof text !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return text;
}

function mergeConfig(userOptions = {}) {
  const config = {};
  
  for (const [key, value] of Object.entries(DEFAULT_CONFIG)) {
    config[key] = { ...value };
  }
  
  for (const [key, value] of Object.entries(userOptions)) {
    if (config[key]) {
      config[key] = { ...config[key], ...value };
    } else {
      config[key] = value;
    }
  }
  
  return config;
}

function removePII(text, options = {}) {
  validateInput(text);
  
  const config = mergeConfig(options);
  let cleanedText = text;
  
  for (const [type, settings] of Object.entries(config)) {
    if (!settings.remove) continue;
    
    const patternInfo = PII_PATTERNS[type];
    const pattern = patternInfo?.pattern || settings.pattern;
    const replacement = settings.replacement || patternInfo?.replacement || '[PII removed]';
    
    if (pattern) {
      cleanedText = cleanedText.replace(pattern, replacement);
    }
  }
  
  return cleanedText;
}

function removePIIDetailed(text, options = {}) {
  validateInput(text);
  
  const config = mergeConfig(options);
  let cleanedText = text;
  const removedItems = [];
  
  for (const [type, settings] of Object.entries(config)) {
    if (!settings.remove) continue;
    
    const patternInfo = PII_PATTERNS[type];
    const pattern = patternInfo?.pattern || settings.pattern;
    const replacement = settings.replacement || patternInfo?.replacement || '[PII removed]';
    
    if (pattern) {
      const matches = cleanedText.match(pattern);
      if (matches) {
        removedItems.push({
          type,
          count: matches.length,
          items: matches.slice(),
          description: patternInfo?.description || `${type} data`
        });
        cleanedText = cleanedText.replace(pattern, replacement);
      }
    }
  }
  
  return {
    cleanedText,
    removedItems,
    originalLength: text.length,
    cleanedLength: cleanedText.length,
    reductionPercentage: Math.round(((text.length - cleanedText.length) / text.length) * 100)
  };
}

function detectPII(text, options = {}) {
  validateInput(text);
  
  const config = mergeConfig(options);
  const detectedItems = [];
  
  for (const [type, settings] of Object.entries(config)) {
    const patternInfo = PII_PATTERNS[type];
    const pattern = patternInfo?.pattern || settings.pattern;
    
    if (pattern) {
      const matches = [];
      const positions = [];
      let match;
      
      const regex = new RegExp(pattern.source, pattern.flags);
      
      while ((match = regex.exec(text)) !== null) {
        matches.push(match[0]);
        positions.push({
          start: match.index,
          end: match.index + match[0].length,
          value: match[0]
        });
        
        if (!pattern.global) break;
      }
      
      if (matches.length > 0) {
        detectedItems.push({
          type,
          count: matches.length,
          items: matches,
          positions,
          description: patternInfo?.description || `${type} data`
        });
      }
    }
  }
  
  return {
    text,
    detectedItems,
    hasPII: detectedItems.length > 0,
    totalMatches: detectedItems.reduce((sum, item) => sum + item.count, 0),
    types: detectedItems.map(item => item.type)
  };
}

function analyzePII(text, options = {}) {
  const detection = detectPII(text, options);
  const removal = removePIIDetailed(text, options);
  
  return {
    original: {
      text,
      length: text.length,
      wordCount: text.split(/\s+/).filter(word => word.length > 0).length
    },
    cleaned: {
      text: removal.cleanedText,
      length: removal.cleanedLength,
      wordCount: removal.cleanedText.split(/\s+/).filter(word => word.length > 0).length
    },
    pii: {
      detected: detection.detectedItems,
      removed: removal.removedItems,
      totalCount: detection.totalMatches,
      types: detection.types,
      reductionPercentage: removal.reductionPercentage
    },
    risk: {
      level: getRiskLevel(detection.totalMatches),
      score: calculateRiskScore(detection.detectedItems)
    }
  };
}

function validatePIICompliance(text, options = {}) {
  const detection = detectPII(text, options);
  
  return {
    isCompliant: !detection.hasPII,
    violations: detection.detectedItems,
    violationCount: detection.totalMatches,
    riskLevel: getRiskLevel(detection.totalMatches),
    riskScore: calculateRiskScore(detection.detectedItems),
    recommendations: getRecommendations(detection.detectedItems)
  };
}

function processBatch(texts, options = {}) {
  if (!Array.isArray(texts)) {
    throw new TypeError('Input must be an array of strings');
  }
  
  return texts.map((text, index) => {
    try {
      const result = removePIIDetailed(text, options);
      return {
        index,
        success: true,
        ...result
      };
    } catch (error) {
      return {
        index,
        success: false,
        error: error.message,
        originalText: text
      };
    }
  });
}

function getRiskLevel(piiCount) {
  if (piiCount === 0) return 'none';
  if (piiCount <= 2) return 'low';
  if (piiCount <= 5) return 'medium';
  if (piiCount <= 10) return 'high';
  return 'critical';
}

function calculateRiskScore(detectedItems) {
  const riskWeights = {
    ssn: 10,
    creditCard: 9,
    passport: 8,
    driversLicense: 7,
    bankAccount: 8,
    email: 3,
    phone: 4,
    address: 5,
    ipAddress: 2,
    zipCode: 2,
    url: 1,
    dateOfBirth: 6
  };
  
  return detectedItems.reduce((score, item) => {
    const weight = riskWeights[item.type] || 1;
    return score + (item.count * weight);
  }, 0);
}

function getRecommendations(detectedItems) {
  const recommendations = [];
  
  if (detectedItems.length === 0) {
    recommendations.push('Text appears to be PII-free');
    return recommendations;
  }
  
  const types = detectedItems.map(item => item.type);
  
  if (types.includes('ssn')) {
    recommendations.push('⚠️ SSN detected - Consider using last 4 digits only');
  }
  
  if (types.includes('creditCard')) {
    recommendations.push('⚠️ Credit card detected - Never store full card numbers');
  }
  
  if (types.includes('email')) {
    recommendations.push('📧 Email detected - Consider using hashed or masked emails');
  }
  
  if (types.includes('phone')) {
    recommendations.push('📞 Phone number detected - Consider masking middle digits');
  }
  
  if (types.includes('address')) {
    recommendations.push('🏠 Address detected - Consider using city/state only');
  }
  
  if (detectedItems.length > 5) {
    recommendations.push('🔥 High PII density - Consider comprehensive data sanitization');
  }
  
  return recommendations;
}

function getAvailableTypes() {
  return Object.keys(PII_PATTERNS).map(type => ({
    type,
    description: PII_PATTERNS[type].description,
    defaultReplacement: PII_PATTERNS[type].replacement
  }));
}

function createCustomPattern(type, pattern, replacement, description) {
  return {
    [type]: {
      pattern,
      replacement,
      description
    }
  };
}

export {
  removePII,
  removePIIDetailed,
  detectPII,
  analyzePII,
  validatePIICompliance,
  processBatch,
  getAvailableTypes,
  createCustomPattern
};

export default removePII;