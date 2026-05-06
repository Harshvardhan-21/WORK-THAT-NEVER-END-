/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, Animated, Easing, TouchableOpacity, Image,
} from 'react-native';
import Svg, { Circle, Rect, Path, G, Line, Ellipse } from 'react-native-svg';
import { ws, hs, rf } from '../../utils/responsive';
import { customerURI } from '../../utils/roleImages';

const AView = Animated.View as any;
const CIRCLE_SIZE = ws(160);

const THEME = {
  primary:   '#6B7C2D',
  secondary: '#8FA83D',
  light:     '#F5F7EB',
  circle:    '#F5F7EB',
  tag:       '#EAF0C4',
  tagText:   '#4A5520',
};

const TAGS = ['Browse Products', 'Easy Ordering', 'Trusted Quality'];

// ─── Background Icons ─────────────────────────────────────────────────────────

function BgIcons() {
  return (
    <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} style={StyleSheet.absoluteFill}>
      {/* Shopping bag */}
      <G opacity={0.18} transform="translate(26, 52)">
        <Rect x="4" y="14" width="40" height="34" rx="6" stroke={THEME.primary} strokeWidth="2.5" fill="none"/>
        <Path d="M14 14 Q14 2 24 2 Q34 2 34 14" stroke={THEME.primary} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <Line x1="18" y1="28" x2="32" y2="28" stroke={THEME.primary} strokeWidth="2" strokeLinecap="round"/>
      </G>
      {/* Star rating */}
      <G opacity={0.15} transform="translate(22, 150)">
        <Path d="M22 2 L27 16 L42 16 L30 25 L35 39 L22 30 L9 39 L14 25 L2 16 L17 16 Z" stroke={THEME.primary} strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
      </G>
      {/* Heart */}
      <G opacity={0.15} transform={`translate(${CIRCLE_SIZE - 82}, 44)`}>
        <Path d="M22 38 Q4 26 4 14 Q4 4 14 4 Q18 4 22 10 Q26 4 32 4 Q40 4 40 14 Q40 26 22 38Z" stroke={THEME.primary} strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
      </G>
      {/* Gift */}
      <G opacity={0.15} transform={`translate(${CIRCLE_SIZE - 78}, 140)`}>
        <Rect x="0" y="14" width="44" height="30" rx="5" stroke={THEME.primary} strokeWidth="2.5" fill="none"/>
        <Rect x="0" y="8"  width="44" height="10" rx="3" stroke={THEME.primary} strokeWidth="2.2" fill="none"/>
        <Line x1="22" y1="8" x2="22" y2="44" stroke={THEME.primary} strokeWidth="2.2" strokeLinecap="round"/>
        <Path d="M22 8 Q16 0 10 4 Q4 8 22 8" stroke={THEME.primary} strokeWidth="2" fill="none" strokeLinecap="round"/>
        <Path d="M22 8 Q28 0 34 4 Q40 8 22 8" stroke={THEME.primary} strokeWidth="2" fill="none" strokeLinecap="round"/>
      </G>
    </Svg>
  );
}

// ─── Character ────────────────────────────────────────────────────────────────

function Character() {
  return (
    <Image
      source={{ uri: customerURI }}
      style={{ width: ws(160), height: ws(160) }}
      resizeMode="cover"
    />
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

interface Props { onBack?: () => void; }

export default function CustomerSlide({ onBack }: Props) {
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
        <Text style={[s.title, { color: '#1A1A2E' }]}>Valued Customers</Text>
        <View style={[s.divider, { backgroundColor: THEME.primary }]} />
        <Text style={s.desc}>
          You are the <Text style={[s.bold, { color: THEME.primary }]}>heart of everything we do.</Text>
          {' '}Explore premium products, enjoy seamless ordering, and experience quality you can trust.
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
  circleWrap: { marginBottom: hs(28), shadowColor: '#6B7C2D', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 12, marginTop: hs(8) },
  circle:     { width: CIRCLE_SIZE, height: CIRCLE_SIZE, borderRadius: CIRCLE_SIZE / 2, alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden' },
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
