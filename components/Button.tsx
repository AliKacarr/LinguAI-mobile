import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
}) => {
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'outline' && styles.outline,
    disabled && styles.disabled,
  ];

  const textStyle = [
    styles.text,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'outline' && styles.outlineText,
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#6C2EB5'} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primary: {
    backgroundColor: '#27ae60', // Yeşil
  },
  secondary: {
    backgroundColor: '#f2994a', // Turuncu
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#6C2EB5', // Mor
    elevation: 0,
    shadowOpacity: 0,
  },
  disabled: {
    backgroundColor: '#E5E5EA',
    borderColor: '#E5E5EA',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF', // Beyaz
  },
  secondaryText: {
    color: '#FFFFFF', // Beyaz
  },
  outlineText: {
    color: '#6C2EB5', // Mor
  },
  disabledText: {
    color: '#8E8E93',
  },
}); 