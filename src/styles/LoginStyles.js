import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', padding: 28, backgroundColor: '#f8fafc' },
    badge: { alignSelf: 'flex-start', backgroundColor: '#dbeafe', borderRadius: 6, color: '#1d4ed8', fontSize: 12, fontWeight: '800', letterSpacing: 1, marginBottom: 18, paddingHorizontal: 10, paddingVertical: 6 },
    title: { color: '#0f172a', fontSize: 30, fontWeight: '800', marginBottom: 8 },
    subtitle: { color: '#64748b', fontSize: 16, marginBottom: 26 },
    form: { backgroundColor: '#fff', borderRadius: 12, elevation: 3, padding: 20, shadowColor: '#0f172a', shadowOpacity: 0.08, shadowRadius: 16, shadowOffset: { width: 0, height: 6 } },
    label: { color: '#334155', fontSize: 14, fontWeight: '700', marginBottom: 8, marginTop: 4 },
    input: { borderColor: '#cbd5e1', borderRadius: 7, borderWidth: 1, color: '#0f172a', marginBottom: 16, padding: 14 },
    passwordRow: { alignItems: 'center', borderColor: '#cbd5e1', borderRadius: 7, borderWidth: 1, flexDirection: 'row', marginBottom: 20 },
    passwordInput: { color: '#0f172a', flex: 1, padding: 14 },
    showPassword: { color: '#2563eb', fontWeight: '700', paddingHorizontal: 14 },
    primaryButton: { alignItems: 'center', backgroundColor: '#2563eb', borderRadius: 7, justifyContent: 'center', minHeight: 50 },
    primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
    linkButton: { alignItems: 'center', marginTop: 18 },
    linkText: { color: '#2563eb', fontWeight: '700' },
    bottomButton: { alignItems: 'center', marginTop: 26 },
    bottomText: { color: '#64748b' },
});