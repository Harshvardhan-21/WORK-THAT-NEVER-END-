/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, Animated, Easing, TouchableOpacity, Image,
} from 'react-native';
import Svg, { Circle, Rect, Path, G, Line, Ellipse } from 'react-native-svg';
import { ws, hs, rf } from '../../utils/responsive';
import { electricianURI } from '../../utils/roleImages';

const AView = Animated.View as any;
const CIRCLE_SIZE = ws(160);

const THEME = {
  primary:   '#1565C0',
  secondary: '#42A5F5',
  light:     '#EBF4FF',
  circle:    '#EBF4FF',
  tag:       '#DBEAFE',
  tagText:   '#1E3A8A',
};

const TAGS = ['Install & Demo', 'First Product User', 'Trusted Expert'];

// ─── Background Icons ─────────────────────────────────────────────────────────

function BgIcons() {
  return (
    <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} style={StyleSheet.absoluteFill}>
      {/* Bulb */}
      <G opacity={0.18} transform="translate(26, 46)">
        <Path d="M18 0 Q36 0 36 18 Q36 30 28 36 L28 44 L8 44 L8 36 Q0 30 0 18 Q0 0 18 0Z" stroke={THEME.primary} strokeWidth="2.5" fill="none"/>
        <Line x1="8"  y1="48" x2="28" y2="48" stroke={THEME.primary} strokeWidth="2.5" strokeLinecap="round"/>
        <Line x1="10" y1="52" x2="26" y2="52" stroke={THEME.primary} strokeWidth="2.5" strokeLinecap="round"/>
        <Line x1="18" y1="10" x2="18" y2="26" stroke={THEME.primary} strokeWidth="2" strokeLinecap="round"/>
        <Line x1="12" y1="18" x2="24" y2="18" stroke={THEME.primary} strokeWidth="2" strokeLinecap="round"/>
      </G>
      {/* Toolbox */}
      <G opacity={0.15} transform="translate(20, 150)">
        <Rect x="0" y="10" width="46" height="32" rx="6" stroke={THEME.primary} strokeWidth="2.5" fill="none"/>
        <Path d="M12 10 L12 4 Q12 0 18 0 L28 0 Q34 0 34 4 L34 10" stroke={THEME.primary} strokeWidth="2.5" fill="none"/>
        <Line x1="0"  y1="24" x2="46" y2="24" stroke={THEME.primary} strokeWidth="2" strokeLinecap="round"/>
        <Line x1="19" y1="17" x2="27" y2="17" stroke={THEME.primary} strokeWidth="2.5" strokeLinecap="round"/>
      </G>
      {/* Socket */}
      <G opacity={0.15} transform={`translate(${CIRCLE_SIZE - 84}, 42)`}>
        <Rect x="0" y="0" width="42" height="42" rx="9" stroke={THEME.primary} strokeWidth="2.5" fill="none"/>
        <Circle cx="14" cy="16" r="4.5" stroke={THEME.primary} strokeWidth="2.2" fill="none"/>
        <Circle cx="28" cy="16" r="4.5" stroke={THEME.primary} strokeWidth="2.2" fill="none"/>
        <Rect x="12" y="28" width="18" height="8" rx="4" stroke={THEME.primary} strokeWidth="2" fill="none"/>
      </G>
      {/* Screwdriver */}
      <G opacity={0.15} transform={`translate(${CIRCLE_SIZE - 68}, 140)`}>
        <Line x1="10" y1="0"  x2="10" y2="38" stroke={THEME.primary} strokeWidth="3" strokeLinecap="round"/>
        <Rect x="4"  y="38" width="12" height="8" rx="2" stroke={THEME.primary} strokeWidth="2" fill="none"/>
        <Path d="M6 46 L4 54 L16 54 L14 46" stroke={THEME.primary} strokeWidth="2" fill="none" strokeLinejoin="round"/>
        <Line x1="8" y1="5"  x2="12" y2="5" stroke={THEME.primary} strokeWidth="2" strokeLinecap="round"/>
      </G>
    </Svg>
  );
}

// ─── Character ────────────────────────────────────────────────────────────────

function Character() {
  return (
    <Image
      source={{ uri: electricianURI }}
      style={{ width: ws(160), height: ws(160) }}
      resizeMode="contain"
    />
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

interface Props { onBack?: () => void; }

export default function ElectricianSlide({ onBack }: Props) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideUp   = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const glowAnim  = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
      Animated.timing(slideUp,   { toValue: 0, duration: 550, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
    Animated.loop(Animated.sequence([
      Animated.timing(glowAnim, { toValue: 1,   duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      Animated.timing(glowAnim, { toValue: 0.7, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
    ])).start();
  }, []);

  return (
    <AView style={[s.root, { opacity: fadeAnim }]}>

      {onBack && (
        <TouchableOpacity style={s.backBtn} onPress={onBack}>
          <Text style={[s.backTxt, { color: THEME.primary }]}>← Back</Text>
        </TouchableOpacity>
      )}

      <AView style={[s.circleWrap, { transform: [{ scale: scaleAnim }], opacity: glowAnim }]}>
        <View style={[s.circle, { backgroundColor: THEME.circle }]}>
          <BgIcons />
          <Character />
        </View>
        <View style={[s.glowRing, { borderColor: THEME.primary }]} />
      </AView>

      <AView style={[s.card, { transform: [{ translateY: slideUp }] }]}>
        <Text style={[s.title, { color: '#1A1A2E' }]}>Proud Electrician</Text>
        <View style={[s.divider, { backgroundColor: THEME.primary }]} />
        <Text style={s.desc}>
          You are the <Text style={[s.bold, { color: THEME.primary }]}>first to use our products.</Text>
          {' '}Your expert installation and demo convinces every customer. We are proud of your trust in SRV.
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
  circleWrap: { marginBottom: hs(28), shadowColor: '#1565C0', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.22, shadowRadius: 24, elevation: 14, marginTop: hs(8) },
  circle:     { width: CIRCLE_SIZE, height: CIRCLE_SIZE, borderRadius: CIRCLE_SIZE / 2, alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden' },
  glowRing:   { position: 'absolute', width: CIRCLE_SIZE + ws(12), height: CIRCLE_SIZE + ws(12), borderRadius: (CIRCLE_SIZE + ws(12)) / 2, borderWidth: 1.5, opacity: 0.3, top: -ws(6), left: -ws(6) },
  card:       { alignItems: 'center', paddingHorizontal: ws(8) },
  title:      { fontSize: rf(26, 22, 32), fontWeight: '900', textAlign: 'center', letterSpacing: 0.3, marginBottom: hs(8) },
  divider:    { width: ws(40), height: 3, borderRadius: 2, marginBottom: hs(12) },
  desc:       { fontSize: rf(14, 12, 16), color: '#6B7280', textAlign: 'center', lineHeight: rf(22, 20, 26), marginBottom: hs(16) },
  bold:       { fontWeight: '700' },
  tagsRow:    { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: ws(8) },
  tag:        { paddingHorizontal: ws(12), paddingVertical: hs(5), borderRadius: ws(20) },
  tagTxt:     { fontSize: rf(10, 9, 12), fontWeight: '700' },
});
