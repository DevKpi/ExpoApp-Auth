const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  projectId: 'expoapp-da9ac'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testUnauthenticatedAccess() {
  console.log('----------------------------------------------------');
  console.log('🧪 Probando lectura de "tareas" sin autenticación...');
  console.log('----------------------------------------------------');

  try {
    const snapshot = await getDocs(collection(db, 'tareas'));
    console.log('❌ ERROR DE SEGURIDAD: Se lograron leer', snapshot.size, 'tareas sin iniciar sesión.');
  } catch (error) {
    if (error.code === 'permission-denied') {
      console.log('✅ REGLA FUNCIONANDO EXITOSAMENTE:');
      console.log('   Firestore bloqueó la lectura porque no hay usuario autenticado.');
      console.log('   Código de error:', error.code);
      console.log('   Detalle:', error.message);
    } else {
      console.log('⚠️ Error inesperado:', error);
    }
  }

  process.exit(0);
}

testUnauthenticatedAccess();
