import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddQuoteModalProps {
  isVisible: boolean;
  onClose: () => void;
  newQuote: string;
  onQuoteChange: (text: string) => void;
  newAuthor: string;
  onAuthorChange: (text: string) => void;
  onAdd: () => void;
}

export const AddQuoteModal: React.FC<AddQuoteModalProps> = ({
  isVisible,
  onClose,
  newQuote,
  onQuoteChange,
  newAuthor,
  onAuthorChange,
  onAdd,
}) => (
  <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Add New Quote</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.modalInput, styles.textArea]}
          placeholder="Write your quote here..."
          multiline
          value={newQuote}
          onChangeText={onQuoteChange}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Author name"
          value={newAuthor}
          onChangeText={onAuthorChange}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
          <Text style={styles.addBtnText}>Save Quote</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 30,
    paddingBottom: 50,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalInput: {
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  addBtn: {
    backgroundColor: '#8B735B',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  addBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
