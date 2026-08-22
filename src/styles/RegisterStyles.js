import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 36,
    },
    header: {
        marginBottom: 24,
    },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: '#f0fdf4',
        borderColor: '#bbf7d0',
        borderRadius: 20,
        borderWidth: 1,
        color: '#16a34a',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.2,
        marginBottom: 14,
        overflow: 'hidden',
        paddingHorizontal: 12,
        paddingVertical: 5,
        textTransform: 'uppercase',
    },
    title: {
        color: '#0f172a',
        fontSize: 32,
        fontWeight: '800',
        letterSpacing: -0.8,
        marginBottom: 6,
    },
    subtitle: {
        color: '#64748b',
        fontSize: 15,
        lineHeight: 22,
    },
    form: {
        backgroundColor: '#ffffff',
        borderColor: '#f1f5f9',
        borderRadius: 20,
        borderWidth: 1,
        padding: 24,
        ...Platform.select({
            ios: {
                shadowColor: '#1e293b',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.08,
                shadowRadius: 18,
            },
            android: {
                elevation: 4,
            },
            web: {
                boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
            },
        }),
    },
    label: {
        color: '#334155',
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.3,
        marginBottom: 8,
        marginTop: 2,
    },
    input: {
        backgroundColor: '#f8fafc',
        borderColor: '#e2e8f0',
        borderRadius: 12,
        borderWidth: 1.5,
        color: '#0f172a',
        fontSize: 15,
        marginBottom: 18,
        paddingHorizontal: 16,
        paddingVertical: 13,
    },
    passwordRow: {
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderColor: '#e2e8f0',
        borderRadius: 12,
        borderWidth: 1.5,
        flexDirection: 'row',
        marginBottom: 22,
    },
    passwordInput: {
        color: '#0f172a',
        flex: 1,
        fontSize: 15,
        paddingHorizontal: 16,
        paddingVertical: 13,
    },
    showPassword: {
        color: '#16a34a',
        fontSize: 13,
        fontWeight: '700',
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    primaryButton: {
        alignItems: 'center',
        backgroundColor: '#16a34a',
        borderRadius: 12,
        justifyContent: 'center',
        minHeight: 52,
        ...Platform.select({
            ios: {
                shadowColor: '#16a34a',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.28,
                shadowRadius: 10,
            },
            android: {
                elevation: 3,
            },
            web: {
                boxShadow: '0 4px 14px 0 rgba(22, 163, 74, 0.3)',
            },
        }),
    },
    primaryButtonPressed: {
        backgroundColor: '#15803d',
        transform: [{ scale: 0.99 }],
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
    bottomButton: {
        alignItems: 'center',
        marginTop: 28,
        paddingVertical: 10,
    },
    bottomText: {
        color: '#64748b',
        fontSize: 14,
    },
    linkText: {
        color: '#16a34a',
        fontWeight: '700',
    },
});