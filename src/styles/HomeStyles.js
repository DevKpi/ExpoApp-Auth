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
        marginBottom: 28,
        alignItems: 'center',
    },
    badge: {
        backgroundColor: '#eff6ff',
        borderColor: '#bfdbfe',
        borderRadius: 20,
        borderWidth: 1,
        color: '#2563eb',
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
        fontSize: 30,
        fontWeight: '800',
        letterSpacing: -0.8,
        marginBottom: 6,
        textAlign: 'center',
    },
    subtitle: {
        color: '#64748b',
        fontSize: 15,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        borderColor: '#f1f5f9',
        borderRadius: 20,
        borderWidth: 1,
        padding: 24,
        marginBottom: 24,
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
    cardTitle: {
        color: '#334155',
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 0.8,
        marginBottom: 16,
        textTransform: 'uppercase',
    },
    infoRow: {
        marginBottom: 12,
    },
    infoLabel: {
        color: '#64748b',
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 4,
    },
    infoValue: {
        color: '#0f172a',
        fontSize: 16,
        fontWeight: '700',
    },
    logoutButton: {
        alignItems: 'center',
        backgroundColor: '#ef4444',
        borderRadius: 12,
        justifyContent: 'center',
        minHeight: 52,
        ...Platform.select({
            ios: {
                shadowColor: '#ef4444',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.25,
                shadowRadius: 10,
            },
            android: {
                elevation: 3,
            },
            web: {
                boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.25)',
            },
        }),
    },
    logoutButtonPressed: {
        backgroundColor: '#dc2626',
        transform: [{ scale: 0.99 }],
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
});
