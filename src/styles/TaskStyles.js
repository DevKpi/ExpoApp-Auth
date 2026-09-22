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
    listContent: {
        padding: 20,
        paddingBottom: 90,
    },
    taskCard: {
        backgroundColor: '#ffffff',
        borderColor: '#e2e8f0',
        borderRadius: 16,
        borderWidth: 1,
        padding: 18,
        marginBottom: 14,
        ...Platform.select({
            ios: {
                shadowColor: '#1e293b',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
            },
            android: {
                elevation: 2,
            },
            web: {
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            },
        }),
    },
    taskCardCompleted: {
        borderColor: '#bbf7d0',
        backgroundColor: '#fbfdfc',
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 12,
    },
    taskTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
        lineHeight: 22,
    },
    taskTitleCompleted: {
        color: '#64748b',
        textDecorationLine: 'line-through',
    },
    statusBadge: {
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderWidth: 1,
    },
    statusBadgeCompleted: {
        backgroundColor: '#f0fdf4',
        borderColor: '#bbf7d0',
    },
    statusBadgePending: {
        backgroundColor: '#fffbeb',
        borderColor: '#fde68a',
    },
    statusTextCompleted: {
        color: '#16a34a',
        fontSize: 12,
        fontWeight: '700',
    },
    statusTextPending: {
        color: '#d97706',
        fontSize: 12,
        fontWeight: '700',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        paddingHorizontal: 24,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 6,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
    },
    loadingText: {
        marginTop: 12,
        color: '#64748b',
        fontSize: 14,
    },
    fabButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#2563eb',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#2563eb',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.35,
                shadowRadius: 10,
            },
            android: {
                elevation: 6,
            },
            web: {
                boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)',
            },
        }),
    },
    fabButtonPressed: {
        backgroundColor: '#1d4ed8',
        transform: [{ scale: 0.98 }],
    },
    fabIcon: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 6,
    },
    fabText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '700',
    },
    // Estilos para AddTaskScreen
    formContainer: {
        padding: 24,
    },
    formCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        padding: 22,
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
    label: {
        color: '#334155',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 4,
    },
    input: {
        backgroundColor: '#f8fafc',
        borderColor: '#e2e8f0',
        borderRadius: 12,
        borderWidth: 1.5,
        color: '#0f172a',
        fontSize: 15,
        paddingHorizontal: 16,
        paddingVertical: 13,
        marginBottom: 20,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        marginBottom: 24,
    },
    switchLabel: {
        color: '#0f172a',
        fontSize: 15,
        fontWeight: '600',
    },
    switchSubLabel: {
        color: '#64748b',
        fontSize: 13,
        marginTop: 2,
    },
    primaryButton: {
        alignItems: 'center',
        backgroundColor: '#2563eb',
        borderRadius: 12,
        justifyContent: 'center',
        minHeight: 52,
        marginBottom: 12,
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
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        justifyContent: 'center',
        minHeight: 50,
    },
    secondaryButtonPressed: {
        backgroundColor: '#e2e8f0',
    },
    secondaryButtonText: {
        color: '#475569',
        fontSize: 15,
        fontWeight: '600',
    },
});
