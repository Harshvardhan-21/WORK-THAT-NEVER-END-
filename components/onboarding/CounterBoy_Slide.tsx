/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, Animated, Easing, TouchableOpacity, Image,
} from 'react-native';
import Svg, { Circle, Rect, Path, G, Line, Ellipse } from 'react-native-svg';
import { ws, hs, rf } from '../../utils/responsive';
import { counterboyURI } from '../../utils/roleImages';

const AView = Animated.View as any;
const CIRCLE_SIZE = ws(160);

const THEME = {
  primary:   '#E8453C',
  secondary: '#FF6B6B',
  light:     '#FFF5F5',
  circle:    '#FFF5F5',
  tag:       '#FFE4E4',
  tagText:   '#C0392B',
};

// ─── Feature Tags ─────────────────────────────────────────────────────────────

const TAGS = ['Customer Service', 'Product Knowledge', 'Billing & Sales'];

// ─── Background Icons ─────────────────────────────────────────────────────────

function BgIcons() {
  return (
    <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} style={StyleSheet.absoluteFill}>
      {/* Cart */}
      <G opacity={0.18} transform="translate(28, 60)">
        <Path d="M0 0 L6 0 L14 36" stroke={THEME.primary} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <Rect x="6" y="10" width="38" height="26" rx="5" stroke={THEME.primary} strokeWidth="2.5" fill="none"/>
        <Circle cx="14" cy="42" r="4" stroke={THEME.primary} strokeWidth="2" fill="none"/>
        <Circle cx="34" cy="42" r="4" stroke={THEME.primary} strokeWidth="2" fill="none"/>
        <Line x1="14" y1="20" x2="14" y2="30" stroke={THEME.primary} strokeWidth="2" strokeLinecap="round"/>
        <Line x1="22" y1="20" x2="22" y2="30" stroke={THEME.primary} strokeWidth="2" strokeLinecap="round"/>
        <Line x1="30" y1="20" x2="30" y2="30" stroke={THEME.primary} strokeWidth="2" strokeLinecap="round"/>
      </G>
      {/* Switch panel */}
      <G opacity={0.15} transform="translate(22, 148)">
        <Rect x="0" y="0" width="36" height="36" rx="6" stroke={THEME.primary} strokeWidth="2.5" fill="none"/>
        <Rect x="6" y="6" width="10" height="10" rx="2" stroke={THEME.primary} strokeWidth="2" fill="none"/>
        <Rect x="20" y="6" width="10" height="10" rx="2" stroke={THEME.primary} strokeWidth="2" fill="none"/>
        <Rect x="6" y="20" width="24" height="10" rx="2" stroke={THEME.primary} strokeWidth="2" fill="none"/>
      </G>
      {/* Chat bubble */}
      <G opacity={0.15} transform={`translate(${CIRCLE_SIZE - 88}, 52)`}>
        <Rect x="0" y="0" width="48" height="34" rx="10" stroke={THEME.primary} strokeWidth="2.5" fill="none"/>
        <Path d="M10 38 L20 34" stroke={THEME.primary} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <Line x1="10" y1="12" x2="38" y2="12" stroke={THEME.primary} strokeWidth="2" strokeLinecap="round"/>
        <Line x1="10" y1="22" x2="30" y2="22" stroke={THEME.primary} strokeWidth="2" strokeLinecap="round"/>
      </G>
      {/* Team */}
      <G opacity={0.15} transform={`translate(${CIRCLE_SIZE - 78}, 130)`}>
        <Circle cx="14" cy="8" r="7" stroke={THEME.primary} strokeWidth="2.2" fill="none"/>
        <Path d="M0 32 Q14 22 28 32" stroke={THEME.primary} strokeWidth="2.2" fill="none"/>
        <Circle cx="30" cy="10" r="6" stroke={THEME.primary} strokeWidth="2" fill="none"/>
        <Path d="M22 32 Q30 24 38 32" stroke={THEME.primary} strokeWidth="2" fill="none"/>
      </G>
    </Svg>
  );
}

// ─── Character ────────────────────────────────────────────────────────────────

function Character() {
  return (
    <Image
      source={{ uri: counterboyURI }}
      style={{ width: ws(220), height: hs(240) }}
      resizeMode="cover"
    />
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

interface Props { onBack?: () => void; }

export default function CounterBoySlide({ onBack }: Props) {
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

      {/* Back button */}
      {onBack && (
        <TouchableOpacity style={s.backBtn} onPress={onBack}>
          <Text style={[s.backTxt, { color: THEME.primary }]}>← Back</Text>
        </TouchableOpacity>
      )}

      {/* Circle illustration */}
      <AView style={[s.circleWrap, { transform: [{ scale: scaleAnim }] }]}>
        <View style={[s.circle, { backgroundColor: THEME.circle }]}>
          <BgIcons />
          <Character />
        </View>
        {/* Glow ring */}
        <View style={[s.glowRing, { borderColor: THEME.primary }]} />
      </AView>

      {/* Content card */}
      <AView style={[s.card, { transform: [{ translateY: slideUp }] }]}>
        <Text style={[s.title, { color: '#1A1A2E' }]}>Classic Counter Boys</Text>
        <View style={[s.divider, { backgroundColor: THEME.primary }]} />
        <Text style={s.desc}>
          You are the <Text style={[s.bold, { color: THEME.primary }]}>face of every sale.</Text>
          {' '}Your product knowledge and warm attitude turns every visitor into a loyal customer.
        </Text>

        {/* Feature tags */}
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

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root:       { flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#FFFFFF', paddingHorizontal: ws(20), paddingTop: hs(48) },
  backBtn:    { position: 'absolute', top: hs(52), left: ws(20), paddingVertical: hs(6), paddingHorizontal: ws(4) },
  backTxt:    { fontSize: rf(14, 12, 16), fontWeight: '700' },
  badgeWrap:  { marginBottom: hs(16) },
  badge:      { paddingHorizontal: ws(16), paddingVertical: hs(6), borderRadius: ws(20) },
  badgeTxt:   { fontSize: rf(11, 10, 13), fontWeight: '800', letterSpacing: 1.2 },
  circleWrap: { marginBottom: hs(28), shadowColor: '#E8453C', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 12, marginTop: hs(8) },
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
