/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, Animated, Easing, TouchableOpacity, Image,
} from 'react-native';
import Svg, { Circle, Rect, Path, G, Line, Ellipse, Polygon, Text as SvgText } from 'react-native-svg';
import { ws, hs, rf } from '../../utils/responsive';
import { dealerURI } from '../../utils/roleImages';

const AView = Animated.View as any;
const CIRCLE_SIZE = ws(160);

const THEME = {
  primary:   '#D97706',
  secondary: '#F59E0B',
  light:     '#FFFBEB',
  circle:    '#FEF9EC',
  tag:       '#FEF3C7',
  tagText:   '#92400E',
};

const TAGS = ['Business Growth', 'First Point of Contact', 'Performance Driven'];

// ─── Background Icons ─────────────────────────────────────────────────────────

function BgIcons() {
  return (
    <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} style={StyleSheet.absoluteFill}>
      {/* Podium */}
      <G opacity={0.18} transform="translate(26, 52)">
        <Rect x="0"  y="22" width="16" height="20" rx="3" stroke={THEME.primary} strokeWidth="2.2" fill="none"/>
        <Rect x="18" y="10" width="16" height="32" rx="3" stroke={THEME.primary} strokeWidth="2.2" fill="none"/>
        <Rect x="36" y="16" width="16" height="26" rx="3" stroke={THEME.primary} strokeWidth="2.2" fill="none"/>
        <SvgText x="26" y="8" fontSize="11" fill={THEME.primary} textAnchor="middle" opacity={0.9}>★</SvgText>
      </G>
      {/* House + growth */}
      <G opacity={0.15} transform={`translate(${CIRCLE_SIZE - 92}, 46)`}>
        <Path d="M22 0 L44 20 L36 20 L36 44 L8 44 L8 20 L0 20 Z" stroke={THEME.primary} strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
        <Rect x="16" y="28" width="12" height="16" rx="2" stroke={THEME.primary} strokeWidth="2" fill="none"/>
        <Path d="M50 36 L58 26 L66 30 L74 16" stroke={THEME.primary} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <Polygon points="74,16 68,18 72,24" fill={THEME.primary} opacity={0.8}/>
      </G>
      {/* Stamp */}
      <G opacity={0.15} transform="translate(22, 150)">
        <Circle cx="22" cy="22" r="20" stroke={THEME.primary} strokeWidth="2.5" fill="none"/>
        <Line x1="10" y1="10" x2="34" y2="34" stroke={THEME.primary} strokeWidth="2.5" strokeLinecap="round"/>
        <Line x1="34" y1="10" x2="10" y2="34" stroke={THEME.primary} strokeWidth="2.5" strokeLinecap="round"/>
        <Rect x="4" y="40" width="36" height="8" rx="4" stroke={THEME.primary} strokeWidth="2" fill="none"/>
      </G>
      {/* Calculator */}
      <G opacity={0.15} transform={`translate(${CIRCLE_SIZE - 80}, 142)`}>
        <Rect x="0" y="0" width="38" height="46" rx="6" stroke={THEME.primary} strokeWidth="2.5" fill="none"/>
        <Rect x="6" y="6" width="26" height="12" rx="3" stroke={THEME.primary} strokeWidth="2" fill="none"/>
        <Circle cx="10" cy="30" r="3" stroke={THEME.primary} strokeWidth="1.8" fill="none"/>
        <Circle cx="19" cy="30" r="3" stroke={THEME.primary} strokeWidth="1.8" fill="none"/>
        <Circle cx="28" cy="30" r="3" stroke={THEME.primary} strokeWidth="1.8" fill="none"/>
        <Circle cx="10" cy="40" r="3" stroke={THEME.primary} strokeWidth="1.8" fill="none"/>
        <Circle cx="19" cy="40" r="3" stroke={THEME.primary} strokeWidth="1.8" fill="none"/>
        <Circle cx="28" cy="40" r="3" stroke={THEME.primary} strokeWidth="1.8" fill="none"/>
      </G>
    </Svg>
  );
}

// ─── Character ────────────────────────────────────────────────────────────────

function Character() {
  return (
    <Image
      source={{ uri: dealerURI }}
      style={{ width: ws(220), height: hs(240) }}
      resizeMode="contain"
    />
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

interface Props { onBack?: () => void; }

export default function DealerSlide({ onBack }: Props) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideUp   = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
      Animated.timing(slideUp,   { toValue: 0, duration: 550, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <AView style={[s.root, { opacity: fadeAnim }]}>

      {onBack && (
        <TouchableOpacity style={s.backBtn} onPress={onBack}>
          <Text style={[s.backTxt, { color: THEME.primary }]}>← Back</Text>
        </TouchableOpacity>
      )}

      <AView style={[s.circleWrap, { transform: [{ scale: scaleAnim }] }]}>
        <View style={[s.circle, { backgroundColor: THEME.circle }]}>
          <BgIcons />
          <Character />
        </View>
        <View style={[s.glowRing, { borderColor: THEME.primary }]} />
      </AView>

      <AView style={[s.card, { transform: [{ translateY: slideUp }] }]}>
        <Text style={[s.title, { color: '#1A1A2E' }]}>Daring Dealers</Text>
        <View style={[s.divider, { backgroundColor: THEME.primary }]} />
        <Text style={s.desc}>
          You are the <Text style={[s.bold, { color: THEME.primary }]}>first point of contact</Text>
          {' '}for SRV. Your performance sets the benchmark — we deeply value your partnership.
        </Text>
        <View style={s.tagsRow}>
          {TAGS.map((tag) => (
            <View key={tag} style={[s.tag, { backgroundColor: THEME.tag }]}>
              <Text style={[s.tagTxt, { color: THEME.tagText }]}>✦ {tag}</Text>
            </View>
          ))}
        </View>
      </AView>

    </AView>
  );
}

const s = StyleSheet.create({
  root:       { flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#FFFFFF', paddingHorizontal: ws(20), paddingTop: hs(48) },
  backBtn:    { position: 'absolute', top: hs(52), left: ws(20), paddingVertical: hs(6), paddingHorizontal: ws(4) },
  backTxt:    { fontSize: rf(14, 12, 16), fontWeight: '700' },
  badgeWrap:  { marginBottom: hs(16) },
  badge:      { paddingHorizontal: ws(16), paddingVertical: hs(6), borderRadius: ws(20) },
  badgeTxt:   { fontSize: rf(11, 10, 13), fontWeight: '800', letterSpacing: 1.2 },
  circleWrap: { marginBottom: hs(28), shadowColor: '#D97706', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 12, marginTop: hs(8) },
  circle:     { width: CIRCLE_SIZE, height: CIRCLE_SIZE, borderRadius: CIRCLE_SIZE / 2, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  glowRing:   { position: 'absolute', width: CIRCLE_SIZE + ws(12), height: CIRCLE_SIZE + ws(12), borderRadius: (CIRCLE_SIZE + ws(12)) / 2, borderWidth: 1.5, opacity: 0.25, top: -ws(6), left: -ws(6) },
  card:       { alignItems: 'center', paddingHorizontal: ws(8) },
  title:      { fontSize: rf(26, 22, 32), fontWeight: '900', textAlign: 'center', letterSpacing: 0.3, marginBottom: hs(8) },
  divider:    { width: ws(40), height: 3, borderRadius: 2, marginBottom: hs(12) },
  desc:       { fontSize: rf(14, 12, 16), color: '#6B7280', textAlign: 'center', lineHeight: rf(22, 20, 26), marginBottom: hs(16) },
  bold:       { fontWeight: '700' },
  tagsRow:    { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: ws(8) },
  tag:        { paddingHorizontal: ws(12), paddingVertical: hs(5), borderRadius: ws(20) },
  tagTxt:     { fontSize: rf(10, 9, 12), fontWeight: '700' },
});
