import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 44,
        paddingHorizontal: 24,
        paddingBottom: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButtonText: {
        color: '#2563eb',
        fontSize: 15,
        fontWeight: '600',
    },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: '#eff6ff',
        borderColor: '#bfdbfe',
        borderRadius: 20,
        borderWidth: 1,
        color: '#2563eb',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.2,
        paddingHorizontal: 12,
        paddingVertical: 4,
        textTransform: 'uppercase',
    },
    title: {
        color: '#0f172a',
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    subtitle: {
        color: '#64748b',
        fontSize: 14,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 24,
        paddingBottom: 40,
    },
    avatarCard: {
        backgroundColor: '#ffffff',
        borderColor: '#f1f5f9',
        borderRadius: 20,
        borderWidth: 1,
        padding: 24,
        marginBottom: 20,
        alignItems: 'center',
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
                boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.06)',
            },
        }),
    },
    avatarContainer: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#eff6ff',
        borderColor: '#bfdbfe',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
        ...Platform.select({
            ios: {
                shadowColor: '#2563eb',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
            },
            android: {
                elevation: 4,
            },
            web: {
                boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.2)',
            },
        }),
    },
    avatarImage: {
        width: 92,
        height: 92,
        borderRadius: 46,
    },
    avatarText: {
        color: '#2563eb',
        fontSize: 36,
        fontWeight: '800',
    },
    avatarName: {
        color: '#0f172a',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 2,
    },
    avatarEmail: {
        color: '#64748b',
        fontSize: 14,
    },
    card: {
        backgroundColor: '#ffffff',
        borderColor: '#f1f5f9',
        borderRadius: 20,
        borderWidth: 1,
        padding: 24,
        marginBottom: 20,
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
    infoRowDivider: {
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        paddingBottom: 14,
        marginBottom: 14,
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
    infoValueMuted: {
        color: '#64748b',
        fontSize: 13,
        fontWeight: '500',
    },
    actionsContainer: {
        gap: 12,
    },
    primaryButton: {
        alignItems: 'center',
        backgroundColor: '#2563eb',
        borderRadius: 12,
        justifyContent: 'center',
        minHeight: 52,
        ...Platform.select({
            ios: {
                shadowColor: '#2563eb',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.28,
                shadowRadius: 10,
            },
            android: {
                elevation: 3,
            },
            web: {
                boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.3)',
            },
        }),
    },
    primaryButtonPressed: {
        backgroundColor: '#1d4ed8',
        transform: [{ scale: 0.99 }],
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
    secondaryButton: {
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderColor: '#e2e8f0',
        borderRadius: 12,
        borderWidth: 1.5,
        justifyContent: 'center',
        minHeight: 52,
    },
    secondaryButtonPressed: {
        backgroundColor: '#f1f5f9',
        transform: [{ scale: 0.99 }],
    },
    secondaryButtonText: {
        color: '#334155',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.2,
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
